import React from "react";
import {devBaseImgUrl } from "../../../../helpers/functions-general";
import useQueryData from "../../../../custom-hook/useQueryData";
import { StoreContext } from "../../../../../store/StoreContext";


const UIMenuAtHomeCoffee = () => {

  const {store, dispatch} = React.useContext(StoreContext) 
  const [info, setInfo] = React.useState(null)
 
const {
  isLoading,
  isFetching,
  error,
  data: menu,
} = useQueryData(
  "/v1/menu",
  "get", // method
  "menu", // key
);

 
return (
  <div className="mb-10">
    <h4 className="text-xl font-bold mb-10 border-b border-gray-200 py-5">
      At Home Coffee
    </h4>

  
      <div className="grid grid-cols-2 gap-10">
      {menu?.data.map((item, key) => (
          item.menu_category_id === 6 && (
        <div className="flex gap-6 items-center" key={key}>
        <img src={`${devBaseImgUrl}/${item.menu_image}`} className='rounded-full size-[110px] cursor-pointer' alt="" onClick={()=>handleShowModal(item)}/>
        <h5 className="text-base font-bold">{item.menu_name}</h5>
        </div>
         )))}
      </div>
   
  </div>
);

};

export default UIMenuAtHomeCoffee;
