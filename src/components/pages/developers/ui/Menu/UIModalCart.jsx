import React from 'react'
import { LiaTimesSolid } from "react-icons/lia";
import { GiCoffeeCup } from "react-icons/gi";
import { FaTrash } from 'react-icons/fa';
import { BsFillCartXFill } from "react-icons/bs";
import { baseImgUrl } from '../../../../helpers/functions-general';

const UIModalCart = ({setCartShow, cartItem, setCartItem}) => {


    const getSubTotal = cartItem.reduce(
        (a, c) => a + Number(c.price),
        0,
     );

   const handleClose = () => setCartShow(false)
    
   const handleEmptyCart = () => setCartItem([])
   const handleRemoveItem = (itemToRemove) => {
    const updatedCartItems = cartItem.filter(
      (item) => item.title !== itemToRemove.title
    );
    setCartItem(updatedCartItems);
  };

  return (
    <div className='modal fixed inset-0 flex justify-end items-center isolate'>
        <div className="backdrop h-screen w-full bg-black/40 absolute top-0 left-0 z-[-1]"></div>
        <div className="modal__main max-w-[400px] w-full h-screen bg-white ">
            <div className='p-4 flex justify-between items-center border-b border-gray-300'>
                <h4 className='mb-0 flex gap-2 items-center font-bold'><GiCoffeeCup className='text-xl'/> Cart</h4>
                <div className='flex gap-4'>
                {cartItem.length !== 0 && (<button className='text-2xl' onClick={handleEmptyCart}><FaTrash/></button> )}
                <button className='text-2xl' onClick={handleClose}><LiaTimesSolid/></button>
                </div>
            </div>
            <div className="px-4 py-10 max-h-[780px] h-full overflow-auto">

                {cartItem.map((item, key) => (
                <div className="cartItem mb-5 flex gap-5 items-center" key={key}>
                  <img src={`${baseImgUrl}/${item.img}`} className='rounded-full size-[70px]' alt="" />
                    <div>
                        <h4 className='font-bold'>{item.title}</h4>
                        <p>{item.price}</p>
                    </div>

                    <button onClick={() => handleRemoveItem(item)}>Remove</button>
                </div>
                ))}


                    

                {cartItem.length === 0 && (

        <div className='empty__cart flex justify-center flex-col items-center'>
        <BsFillCartXFill className='text-[80px] opacity-30'/>
        <h3 className='font-bold opacity-25'>Cart Empty</h3>
        </div>

                )}

            </div>

            <ul className='p-4 bg-accent text-white rounded-md flex justify-between text-xl mx-2'>
                    <li className='font-bold '>Total</li>
                    <li>Php {getSubTotal.toFixed(2)}</li>
                </ul>
        </div>
    </div>
  )
}

export default UIModalCart