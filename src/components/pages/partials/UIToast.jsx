import React from 'react'
import {FaCheckCircle} from 'react-icons/fa'


const UIToast = ({setSuccess}) => {
 
    React.useEffect( () => {
            setTimeout(() =>
{
            setSuccess(false);
        }, 500)
    },[])

  return (
    <div className="toast fixed top-2 left-1/2 -translate-x-1/2 w-[300px] p-2 rounded-md bg-green-100 border-l-2 border-green-800 
    flex justify-between items-center shadow-md">
   <div className="flex gap-2">
   <FaCheckCircle className="text-accent"/>
     <ul>
       <li><h5 className="font-bold text-small">Succcess</h5></li>
       <li>Successfully Added to Cart</li>
     </ul>
   </div>
   </div>
  )
}

export default UIToast
