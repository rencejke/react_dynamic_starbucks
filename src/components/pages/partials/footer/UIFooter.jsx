import React from "react";
import { Link } from "react-router-dom";
import { footerLinks, footerunderlinks } from "./links";

const UIFooter = () => {
  return (
    <footer className="container ml-auto">
      <div className="grid grid-cols-5 w-[100%] gap-5 border-b border-black pb-10">

        {footerLinks.map((item, key) => {
            return(
                <div className="footer-link" key={key}>
                <h3 className="mb-12">{item.title}</h3>
      
                <ul className="opacity-70 space-y-6">
                    {item.links.map((link, key) => <li key={key}><Link to={`${link}`} >{link.label}</Link></li>)}
                  
                </ul>
              </div>
            )
        })}
      
      </div>
        
      {footerunderlinks.map((item, key) => {
        
            return(
                <div className="footer-link mt-8"  key={key}>
                <ul className="opacity-70 space-y-6 mb-5">
                    {item.links2.map((link2, key) => <li key={key}><Link className="font-bold" to={`${link2}`} >{link2.label2}</Link></li>)}
                </ul>
                <small className="text-[1rem]">© 2024 Starbucks Coffee Company. All rights reserved.</small>
            </div>
            )
        })}

      

    </footer>
  );
};

export default UIFooter;
