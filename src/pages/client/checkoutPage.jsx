import { useState } from "react"
import { TbTrash } from "react-icons/tb"
import { useLocation, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"

export default function CheckoutPage(){
    const location = useLocation()
    const navigate = useNavigate()
    const [cart, setCart] = useState(location.state.items || [])

    if(location.state.items == null){
        toast.error("Please select items to checkout")
        navigate("/products")
    }

    function getTotal(){
        let total =0
        cart.forEach((item)=>{
            total += item.quantity * item.price
        })
        return total
    }

    async function placeOrder(){
        const token = localStorage.getItem("token")
        if(token == null){
            toast.error("Please login first")
            navigate("/login")
            return
        }
        const order = {
            address: "Ratnapura",
            phone: "077777772",
            items:[]
        }
        cart.forEach((item)=>{
            order.items.push({
                productId:item.productId,
                qty:item.quantity
            })
        })

        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders",order,{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            })
            toast.success("Order placed successfully")
            //navigate("/products")

        }catch(err){
            console.error(err)
            toast.error("Failed to plase order")
            return
        }
    }
    
    return(
        <div className="w-full h-screen flex flex-col items-center py-[40px]">
            {
                cart.map((item,index)=>{
                    return(
                        <div key={item.productId} className="w-[800px] h-[100px] m-[10px] shadow-2xl flex flex-row items-center bg-amber-100 relative">
                            <img src={item.image} className="w-[100px] h-[100px] object-cover"/>
                            <div className="w-[320px] h-full flex flex-col justify-center pl-[10px]">
                                <span className=" font-bold ">{item.name}</span>
                                <span className=" font-semibold ">{item.price.toFixed(2)}</span>
                            </div>
                            <div className="w-[190px] h-full flex flex-row justify-center items-center">
                                <button className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-300" onClick={()=>{
                                    const newCart = [...cart]
                                    newCart[index].quantity -= 1
                                    if(newCart[index].quantity <= 0){
                                        newCart.splice(index,1)
                                    }
                                    setCart(newCart)
                                }}>-</button>

                                <button className="mx-[10px]">{item.quantity}</button>
                                <button className="flex justify-center items-center w-[30px] rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-300" onClick={()=>{
                                    const newCart = [...cart]
                                    //json copy 
                                    //const student = {name: "Jhon", age:20}
                                    //const studentCopy ={...student}
                                    newCart[index].quantity += 1
                                    setCart(newCart)
                                }}>+</button>
                            </div>
                            <div className="w-[190px] h-full flex items-center justify-end pr-[10px]">
                                <span className="font-semibold">{(item.quantity*item.price).toFixed(2)}</span>
                            </div>
                            <button className="w-[30px] h-[30px] absolute right-[-40px] cursor-pointer bg-red-700 shadow rounded-full flex justify-center items-center text-white border-[2px] border-red-700 hover:bg-white hover:text-red-700" onClick={
                                ()=>{
                                    const newCart = [...cart]
                                    newCart.splice(index,1)
                                    setCart(newCart)
                                }
                            }>
                                <TbTrash className="text-xl"/>
                            </button>
                        </div>
                    )
                })
            }
            <div className="w-[800px] h-[100px] m-[10px] p-[10px] shadow-2xl flex flex-row items-center justify-end bg-amber-400 relative ">
                <span className="font-bold text-2xl ">Total:{" "}{getTotal().toFixed(2)}</span>
                <button onClick={placeOrder} className="absolute left-[10px] w-[150px] h-[50px] cursor-pointer rounded-lg shadow-2xl bg-gray-700 text-white border-[2px] border-blue-500 hover:bg-gray-400 hover:text-black">Place Order</button>
            </div>
        </div>
    )
}