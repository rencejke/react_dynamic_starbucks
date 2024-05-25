import React from "react";
import { data } from "./data";
import UIHeader from "../../../partials/UIHeader";
import UIFooter from "../../../partials/footer/UIFooter";
import UIHomeCard from "./UIHomeCard";

const UIHome = () => {
  return (
    <div>
      <UIHeader />
      <div className="max-w-[1500px] w-full mx-auto px-4">

      {data.map((item, key)=><UIHomeCard item={item} key={key}/>)}
        
      </div>
      <UIFooter  />
    </div>
  );
};

export default UIHome;
