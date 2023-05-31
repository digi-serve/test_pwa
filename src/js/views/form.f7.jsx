import formTextbox from "./formTextbox.f7.jsx";
import formSelect from "./formSelect.f7.jsx";

export default class F7ViewList {
   constructor(dcID, allDCs, $f7, $store, record) {
      this.dcID = dcID;
      this.allDCs = allDCs;
      this.$f7 = $f7;
      this.$store = $store;
      this.isLoading = false;
      this.record = record;
      this.views = [
         {
            key: "text",
            id: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
            label: "Name",
            field: "Name",
            placeholder: "Your name",
         },
         {
            key: "email",
            id: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
            label: "E-mail",
            field: "Email",
            placeholder: "Your email address",
         },
         {
            key: "text",
            id: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
            label: "URL",
            field: "URL",
            placeholder: "Your website URL",
         },
         {
            key: "text",
            id: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
            label: "Phone",
            field: "Phone",
            placeholder: "Your phone number",
         },
         {
            key: "selectsingle",
            id: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
            label: "Gender",
            field: "Gender",
            placeholder: "Select your gender",
         },
      ];
   }

   openView(page, data) {
      this.$f7.view.main.router.navigate(page, {
         props: {
            data: data,
         },
         ignoreCache: true,
      });
   }

   loadMore() {
      if (this.allDCs[this.dcID].value.hasMore) {
         this.$store.dispatch("getAppBuilderData", this.dcID);
      }
   }

   hasMore() {
      if (this.allDCs[this.dcID].value.hasMore) {
         return <div class="preloader infinite-scroll-preloader"></div>;
      }
   }

   save() {
      this.isLoading = true;
      var formData = this.$f7.form.convertToData("#my-form");
      //convert toggle back to boolean
      formData.Toggle = formData.Toggle.length ? 1 : 0;
      //convert date to JS Date().toString()
      formData.Birthday = new Date(formData.Birthday).toISOString();
      console.log(formData);
      // alert(JSON.stringify(formData));

      this.$store.dispatch("updateRecord", {
         dcID: "faa9905e-dea8-4c7f-8eb4-98f1e6e66506",
         recordID: this.record.uuid,
         record: formData,
      });
      setTimeout(function () {
         this.isLoading = false;
      }, 1000);
   }

   isLoadingCheck() {
      if (this.isLoading) {
         return "button-loading";
      } else {
         return "";
      }
   }

   init() {
      //convert boolean for toggle UI
      this.record.Toggle = this.record.Toggle ? "on" : "off";
      //convert date for date UI
      if (this.record.Birthday) {
         var MyDate = new Date(this.record.Birthday);
         var MyDateString =
            MyDate.getFullYear() +
            "-" +
            ("0" + (MyDate.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + MyDate.getDate()).slice(-2);
         this.record.Birthday = MyDateString;
      }
      //fill in form
      this.$f7.form.fillFromData("#my-form", this.record);

      // listen for when we remove the preloader on the smart select then set the value to the select
      // this is just a hack to get the value of the smart select set we may be able to take this out
      if (this.$f7.$(".smartSelectCountry .item-after .preloader").length) {
         $(".smartSelectCountry .item-after .preloader")[0].addEventListener(
            "DOMNodeRemoved",
            () => {
               this.$f7
                  .$(
                     "select[name='Country'] option[value='" +
                        this.record.Country +
                        "']"
                  )
                  .prop("selected", "selected");
            }
         );
      }
   }

   viewHTML() {
      let allResults = [];

      // let views = Page.views();
      // views.forEach((v) => {
      // allResults.push(v.html(...));
      // })
      this.views.forEach((view) => {
         switch (view.key) {
            case "email":
            case "text":
               let textbox = new formTextbox(
                  view,
                  this.allDCs,
                  this.$f7,
                  this.$store,
                  this.record
               );
               allResults.push(textbox.html());
               break;
            case "selectmultiple":
            case "selectsingle":
               let select = new formSelect(
                  view,
                  this.allDCs,
                  this.$f7,
                  this.$store,
                  this.record
               );
               allResults.push(select.html());
               break;
            default:
            // code block
         }
      });

      return allResults.map((r) => r()); // render each jsx template
   }

   html() {
      return () => (
         <form
            class="list list-inset list-strong-ios list-dividers-ios list-outline-ios"
            id="my-form"
         >
            <ul>
               {this.viewHTML()}
               <li>
                  <div class="item-content item-input">
                     <div class="item-inner">
                        <div class="item-title item-label">Birthday</div>
                        <div class="item-input-wrap">
                           <input
                              name="Birthday"
                              type="date"
                              placeholder="Birthday"
                           />
                        </div>
                     </div>
                  </div>
               </li>
               <li>
                  <div class="item-content">
                     <div class="item-inner">
                        <div class="item-title">Toggle</div>
                        <div class="item-after">
                           <label class="toggle toggle-init">
                              <input name="Toggle" type="checkbox" />
                              <span class="toggle-icon"></span>
                           </label>
                        </div>
                     </div>
                  </div>
               </li>
               <li>
                  <div class="item-content item-input">
                     <div class="item-inner">
                        <div class="item-title item-label">Slider</div>
                        <div class="item-input-wrap">
                           <div
                              class="range-slider range-slider-init"
                              data-label="true"
                           >
                              <input
                                 name="Slider"
                                 type="range"
                                 value="50"
                                 min="0"
                                 max="100"
                                 step="1"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </li>
               <li class="align-top">
                  <div class="item-content item-input">
                     <div class="item-inner">
                        <div class="item-title item-label">Resizable</div>
                        <div class="item-input-wrap">
                           <textarea
                              name="Bio"
                              placeholder="Bio"
                              class="resizable"
                           ></textarea>
                        </div>
                     </div>
                  </div>
               </li>
            </ul>
            <div class="block">
               <a
                  onClick={() => this.save()}
                  class="button button-large button-fill button-preloader"
                  href="#"
               >
                  <span class="preloader"></span>
                  <span>Save</span>
               </a>
            </div>
         </form>
      );
   }
}
