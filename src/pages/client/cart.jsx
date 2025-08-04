import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../utils/cart"
import { TbTrash } from "react-icons/tb"
import { useNavigate } from "react-router-dom"

export default function CartPage(){

    const [cart, setCart] = useState(getCart())
    const navigate = useNavigate()
    return(
        <div className="w-full h-screen flex flex-col items-center py-[40px]">
            {
                cart.map((item)=>{
                    return(
                        <div key={item.productId} className="w-[800px] h-[100px] m-[10px] shadow-2xl flex flex-row items-center bg-amber-100 relative">
                            <img src={item.image} className="w-[100px] h-[100px] object-cover"/>
                            <div className="w-[320px] h-full flex flex-col justify-center pl-[10px]">
                                <span className=" font-bold ">{item.name}</span>
                                <span className=" font-semibold ">{item.price.toFixed(2)}</span>
                            </div>
                            <div className="w-[190px] h-full flex flex-row justify-center items-center">
                                <button className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-300" onClick={()=>{
                                    addToCart(item,-1)
                                    setCart(getCart())
                                }}>-</button>
                                <button className="mx-[10px]">{item.quantity}</button>
                                <button className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-300" onClick={()=>{
                                    addToCart(item,1)
                                    setCart(getCart())
                                }}>+</button>
                            </div>
                            <div className="w-[190px] h-full flex items-center justify-end pr-[10px]">
                                <span className="font-semibold">{(item.quantity*item.price).toFixed(2)}</span>
                            </div>
                            <button className="w-[30px] h-[30px] absolute right-[-40px] cursor-pointer bg-red-700 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-700 hover:bg-white hover:text-red-700" onClick={
                                ()=>{
                                    addToCart(item, -item.quantity)
                                    setCart(getCart())
                                }
                            }>
                                <TbTrash className="text-xl"/>
                            </button>
                        </div>
                    )
                })
            }
            <div className="w-[800px] h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-end bg-amber-400 relative ">
                <span className="font-bold text-2xl ">Total: {getTotal().toFixed(2)}</span>
                <button className="absolute left-[10px] w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl bg-gray-700 text-white border-[2px] border-blue-500 hover:bg-gray-400 hover:text-black" onClick={
                    ()=>{
                        
                        navigate("/checkout", {state:{items:cart}})
                    }
                }>Checkout</button>
            </div>
        </div>
    )
}