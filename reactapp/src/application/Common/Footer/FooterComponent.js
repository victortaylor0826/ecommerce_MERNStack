import React from "react";
import "./Footer.css";

// export default function Footer(props){
//     return(
//         <>
//             <h3><i>This is the Footer Component</i></h3>
//             <b>{props.address1}</b>
//         </>
//     )
// }

// //creating functional component
// import React from "react";

//default export
export default function FooterComponent(props) {
  return (
    <>
      <div className="footer">
        © Copyright 2019 All rights reserved. &nbsp;|&nbsp;{" "}
        <a href="https://www.synergisticit.com/" target="_blank">
          SynergisticIT
        </a>{" "}
        &nbsp;|&nbsp;{" "}
        <a href="http://www.synergisticit.com/sitemap.xml" target="_blank">
          Sitemap
        </a>
      </div>
      <div className="hidden_footer"></div>
    </>
  );
}
