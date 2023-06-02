/*
 * StorageLocal
 *
 * An interface for storing and retrieving Client Side data.  Data stored
 * in StorageLoacal is NOT encrypted.
 *
 * This implementation is based upon the webix.storage.local library.
 * See: https://docs.webix.com/api__refs__storage.local.html
 *
 */

import EventEmitter from "../AppBuilder/platform/ABEmitter";

class StorageLocal extends EventEmitter {
   constructor() {
      super();

      this.tenantStorage = null;
      // {Webix.storage} object.
      // We divide the storage data according to the tenant we are working
      // with.  This way Users who can move between different Tenants can
      // keep their local data separated.
   }

   init(AB) {
      // {ABFactory} AB

      this.AB = AB;
      this.tenantID = this.AB.Tenant.id();
      if (!this.tenantID) {
         this.tenantID = "noAuth";
         // "noAuth" is considered the tenant on our Login sequence
         // which should have a minimum of data stored (language maybe?)
      }

      this.tenantStorage = JSON.parse(
         window.localStorage.getItem(this.tenantID) || "{}"
      );

      // this isn't actually an Async operation, so just resolve()
      return Promise.resolve();
   }

   _save() {
      return Promise.resolve(
         localStorage.setItem(this.tenantID, JSON.stringify(this.tenantStorage))
      );
   }

   set(key, value /* , options = {} */) {
      return Promise.resolve().then(() => {
         this.tenantStorage[key] = value;
         return this._save();
      });
   }

   get(key /*, options = {} */) {
      return Promise.resolve().then(() => {
         return this.tenantStorage[key];
      });
   }

   clear(key) {
      return Promise.resolve().then(() => {
         delete this.tenantStorage[key];
         return this._save();
      });
   }

   clearAll() {
      return Promise.resolve().then(() => {
         this.tenantStorage = {};
         return this._save();
      });
   }
}

export default new StorageLocal();
