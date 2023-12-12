/**
 * ABMobileViewFormImage
 * The view that displays a form textbox on the screen.
 */

import ABMobileViewFormImageCore from "../../core/mobile/ABMobileViewFormImageCore.js";

export default class ABMobileViewFormImage extends ABMobileViewFormImageCore {
   // constructor(...params) {
   //    super(...params);
   // }

   async init() {}

   /**
    * @method valuePrepare()
    * Prepare our value for the Form Submission.  This means we need to
    * upload the file to the Site, and then store the .uuid with this
    * field.
    * @return {Promise}
    */
   // async valuePrepare() {
   //    let field = this.field();
   //    let formElement = document.getElementById(this.id);
   //    let formData = new FormData(formElement);

   //    try {
   //       let response = await this.AB.Network.post({
   //          url: field.urlUpload(false),
   //          data: formData,
   //       });
   //       this.AB.$(`#${this.idFileID}`).val(response.uuid);
   //    } catch (e) {
   //       this.AB.notify.developer(e, {
   //          context:
   //             "ABMobileViewFormFile.value(): unable to upload File to site",
   //       });
   //       // TODO: update Visible Form Element with Validation Error.
   //    }
   // }

   inputElementUpload($h) {
      let $inputElement = $h`
         <input
            id=${this.idUpload}
            type="file"
            name="image"
            class="button button-big button-fill"
            accept="image/*"
            capture="environment"
         />
      `;

      this.updateProperties($inputElement);

      return $inputElement;
   }
}
