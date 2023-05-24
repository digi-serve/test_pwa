export default class F7ViewList {
   constructor(dcID, allDCs) {
      this.dcID = dcID;
      this.allDCs = allDCs;
   }
   html($h, openView, loadMore) {
      return () => $h`
         <div data-infinite-distance="50" class="page-content infinite-scroll-content" @infinite=${() =>
            loadMore("faa9905e-dea8-4c7f-8eb4-98f1e6e66506")}>
            ${
               this.allDCs[this.dcID].value.length == 0
                  ? $h`
                  <div>No records found.</div>
               `
                  : $h`
                  <div class="list links-list list-outline-ios list-strong-ios list-dividers-ios">
                     <ul>
                        ${this.allDCs[this.dcID].value.map(
                           (item, index) => $h`
                              <li key=${item.id}>
                                 <a href="#" @click=${() =>
                                    openView("/edit", item)}>
                                    ${item["Name"]}
                                 </a>
                              </li>
                           `
                        )}
                     </ul>
                  </div>
               `
            }
         </div>
      `;
   }
}
