import React from "react";
import UIHeader from "../../../partials/UIHeader";
import UIMenuDrinks from "./UIMenuDrinks";
import UIMenuFoods from "./UIMenuFoods";
import UIMenuAtHomeCoffee from "./UIMenuAtHomeCoffee";
import UIMenuMerchandise from "./UIMenuMerchandise";
import UIModalViewItem from "./UIModalViewItem";
import UIModalCart from "./UIModalCart";
import UIToast from "../../../partials/UIToast";
import UIFooter from "../../../partials/footer/UIFooter";


const UIMenu = () => {
  const [menuTab, setMenuTab] = React.useState('drinks')  
  const [isModalShow, setModalShow] = React.useState(false);
  const [isCartShow, setCartShow] = React.useState(false);
  const [subItem, setSubItem] = React.useState([]);
  const [cartItem, setCartItem] = React.useState([]);
  const [success, setSuccess] = React.useState(false)

  const handleChangeMenu = (menu) => {
    setMenuTab(menu)
  }


  return (
    <div>
        <UIHeader setCartShow={setCartShow} cartItem={cartItem}/>
        <div className="container"> 
           <div className="grid grid-cols-[20%_1fr] gap-5 my-20">
                <aside>
                    <ul className='space-y-5'>
                        <li><button className={`font-bold ${menuTab==="drinks" ? "text-accent" : "" }`} onClick={() => handleChangeMenu("drinks")}>Drinks</button></li>
                        <li><button className={`font-bold ${menuTab==="foods" ? "text-accent" : "" }`} onClick={() => handleChangeMenu("foods")}>Food</button></li>
                        <li><button className={`font-bold ${menuTab==="ahcoffee" ? "text-accent" : "" }`} onClick={() => handleChangeMenu("ahcoffee")}>At Home Coffee</button></li>
                        <li><button className={`font-bold ${menuTab==="merchandise" ? "text-accent" : "" }`} onClick={() => handleChangeMenu("merchandise")}>Merchandise</button></li>
                    </ul>
                </aside>

                <main>
                    <h2>Menu</h2>
                    {menuTab === "drinks" && <UIMenuDrinks setModalShow={setModalShow} setSubItem={setSubItem}/>}
                    {menuTab === "foods" && <UIMenuFoods setModalShow={setModalShow} setSubItem={setSubItem}/>}
                    {menuTab === "ahcoffee" && <UIMenuAtHomeCoffee setModalShow={setModalShow} setSubItem={setSubItem}/>}
                    {menuTab === "merchandise" && <UIMenuMerchandise setModalShow={setModalShow} setSubItem={setSubItem}/>}
                </main>
            </div> 
        </div>
        <UIFooter/>
      {isModalShow &&  <UIModalViewItem setModalShow={setModalShow} subItem={subItem} setCartItem={setCartItem} cartItem={cartItem} setSuccess={setSuccess}/>}

      {isCartShow && <UIModalCart setCartShow={setCartShow} cartItem={cartItem} setCartItem={setCartItem}/>}


      {success && <UIToast setSuccess={setSuccess}/>}
      
      

    </div>
  )
}

export default UIMenu