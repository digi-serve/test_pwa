export default (props) => {
   return () => (
      <div
         data-infinite-distance="50"
         class="page-content infinite-scroll-content"
         onInfinite={() => props.loadMore(props.dcID)}
      >
         <div class="list links-list list-outline-ios list-strong-ios list-dividers-ios">
            <ul>
               {props.allDCs[props.dcID].value.map((item) => (
                  <li key={item.id}>
                     <a href="#" onClick={() => props.openView("/edit", item)}>
                        {item.Name}
                     </a>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};
