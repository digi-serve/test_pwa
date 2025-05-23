

export default (AB) => {
   const L = AB.Label();
   //  Load the { items, meta } data structure before continuing with
   // the rest of the init process.
   // AB.Network.get({ url: "/config/inbox" }).then((inboxConfig) => {
   // AB.Config.configInbox(inboxConfig);
   // this.initDelayed(AB);
   // });

//   this.AB.Network.get({ url: "/config/inbox" }).then((inboxConfig) => {



   
   return () => {
      return () => (
         <div class="page">
            <div class="navbar">
               <div class="navbar-bg"></div>
               <div class="navbar-inner sliding">
                  <div class="left">
                     <a href="#" class="link back">
                        <i class="icon icon-back"></i>
                        <span class="if-not-md">{L("Back")}</span>
                     </a>
                  </div>
                  <div class="title">{L("Inbox")}</div>
               </div>
            </div>
            <div class="page-content">
               <div class="list list-strong accordion-list">
                  <ul>
                     <li class="accordion-item">
                        <a class="item-link item-content">
                           <div class="item-inner">
                              <div class="item-title">Web</div>
                           </div>
                        </a>
                        <div class="accordion-item-content">
                           <div class="block">
                              <h3>Process</h3>
                              <div class="list">
                                 <ul>
                                    <li>
                                       <a href="/inbox/item" class="item-link">
                                       <div class="item-content">
                                          <div class="item-inner">
                                             <div class="item-title">JavaScript</div>
                                             <div class="item-after">
                                                <span class="badge color-red">2</span>
                                             </div>
                                          </div>
                                       </div>
                                       </a>
                                    </li>
                                    <li>
                                        <a href="/inbox/item" class="item-link">
                                       <div class="item-content">
                                          <div class="item-inner">
                                             <div class="item-title">Python</div>
                                             <div class="item-after">
                                                <span class="badge color-red">95</span>
                                             </div>
                                          </div>
                                       </div>
                                       </a>
                                    </li>
                                 
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </li>
                     <li class="accordion-item">
                        <a class="item-link item-content">
                           <div class="item-inner">
                              <div class="item-title">Web</div>
                           </div>
                        </a>
                        <div class="accordion-item-content">
                           <div class="block">
                              <h3>Process</h3>
                              <div class="list">
                                 <ul>
                                    <li>
                                       <div class="item-content">
                                          <div class="item-inner">
                                             <div class="item-title">JavaScript</div>
                                             <div class="item-after">
                                                <span class="badge color-red">120</span>
                                             </div>
                                          </div>
                                       </div>
                                    </li>
                                    <li>
                                       <div class="item-content">
                                          <div class="item-inner">
                                             <div class="item-title">Python</div>
                                             <div class="item-after">
                                                <span class="badge color-red">95</span>
                                             </div>
                                          </div>
                                       </div>
                                    </li>
                                    <li>
                                       <div class="item-content">
                                          <div class="item-inner">
                                             <div class="item-title">Go</div>
                                             <div class="item-after">
                                                <span class="badge color-red">48</span>
                                             </div>
                                          </div>
                                       </div>
                                    </li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      );
   };
};
