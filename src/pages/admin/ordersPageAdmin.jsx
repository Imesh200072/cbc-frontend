import axios from "axios"
import { useEffect, useState } from "react"
import Paginator from "../../components/paginator"
import toast from "react-hot-toast"

export default function OrdersPageAdmin(){
    const [orders,setOrders] = useState([])
    const [loading,setLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [popupVisible,setPopupVisible] = useState(false)
    const [clickedOrder, setClickedOrder] = useState(null)
    const [orderStatus,setOrderStatus] = useState("pending")
    const [orderNotes,setOrderNotes] = useState("")

    useEffect(()=>{

        if(loading){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders/"+page+"/"+limit,{
            headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
        })
            .then((res)=>{
                setOrders(res.data.orders)
                setTotalPages(res.data.totalPages)
                setLoading(false)
                console.log(res.data)
            })
            .catch((err)=>{
                console.error(err)
            })
        }
    },[loading,page,limit])

    return(
        <div className="w-full h-full flex flex-col justify-between">
            <table className="w-full border-[3px]">
                <thead>
                    <tr>
                        <th className="p-[10px]">Order Id</th>
                        <th className="p-[10px]">Email</th>
                        <th className="p-[10px]">Name</th>
                        <th className="p-[10px]">Address</th>
                        <th className="p-[10px]">Phone</th>
                        <th className="p-[10px]">Status</th>
                        <th className="p-[10px]">Date</th>
                        <th className="p-[10px]">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order,index)=>{
                            return(
                            <tr key={index} className="border-b-[1px] hover:bg-blue-600 hover:text-white" onClick={()=>{
                                setOrderStatus(order.status)
                                setOrderNotes(order.notes)
                                setClickedOrder(order)
                                setPopupVisible(true)
                            }}>
                                <td className="p-[10px]">{order.orderID}</td>
                                <td className="p-[10px]">{order.email}</td>
                                <td className="p-[10px]">{order.name}</td>
                                <td className="p-[10px]">{order.address}</td>
                                <td className="p-[10px]">{order.phone}</td>
                                <td className="p-[10px]">{order.status}</td>
                                <td className="p-[10px]">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="p-[10px] text-end">{order.total.toFixed(2)}</td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {popupVisible && clickedOrder && (
            <div className="fixed top-0 left-0 w-full h-full bg-[#00000050] flex justify-center items-center z-50">
                <div className="w-full max-w-3xl max-h-[90vh] bg-white rounded-lg shadow-lg relative p-6 ">
                    {
                        (orderStatus!=clickedOrder.status || orderNotes!=clickedOrder.notes)&&<button className="absolute top-2 right-12 bg-blue-500 text-white p-2 rounded-lg" onClick={async()=>{
                            setPopupVisible(false)
                            try{
                                await axios.put(
                                    import.meta.env.VITE_BACKEND_URL + "/api/orders/" + clickedOrder.orderID,
                                    {
                                        status:orderStatus,
                                        notes:orderNotes
                                    },
                                    {
                                        headers:{
                                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                                        },
                                    }
                                )
                                toast.success("Order updated successfully")
                                setLoading(true)
                            }catch(err){
                                console.error(err)
                                toast.error("Failed to update order")
                            }
                        }}>
                            Save Changes
                        </button>
                    }
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-red-600 hover:text-red-800 font-bold text-lg cursor-pointer border-2 rounded-full"
                    onClick={() => setPopupVisible(false)}
                >
                 ×
                </button>

                {/* Header */}
                <h2 className="text-2xl font-semibold mb-4">Order Details - {clickedOrder.orderID}</h2>

                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                    <p><span className="font-medium">Name:</span> {clickedOrder.name}</p>
                    <p><span className="font-medium">Email:</span> {clickedOrder.email}</p>
                    <p><span className="font-medium">Phone:</span> {clickedOrder.phone}</p>
                    </div>
                    <div>
                    <p><span className="font-medium">Address:</span> {clickedOrder.address}</p>
                    <p>
                        <span className="font-medium">Status:</span> <span className="capitalize">{clickedOrder.status}</span>
                        <select className="ml-4 p-1 border rounded" value={orderStatus} onChange={(e)=>setOrderStatus(e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </p>
                    <p><span className="font-medium">Notes:</span> {clickedOrder.notes}</p>
                    <textarea className="w-full h-[100px] p-2 border rounded mt-2" value={orderNotes} onChange={(e)=>setOrderNotes(e.target.value)}></textarea>
                    <p><span className="font-medium">Date:</span> {new Date(clickedOrder.date).toLocaleString()}</p>
                    </div>
                </div>

                {/* Order Notes */}
                

                {/* Order Items */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">Items</h3>
                    <div className="space-y-4 h-[200px] overflow-y-auto">
                    {clickedOrder.items?.map((item) => (
                        <div key={item._id} className="flex items-center py-3 gap-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p>Qty: {item.qty} × Rs. {item.price.toFixed(2)}</p>
                        </div>
                        <p className="font-semibold">Rs. {(item.qty * item.price).toFixed(2)}</p>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Total */}
                <div className="text-right mt-6">
                    <p className="text-lg font-bold">Total: Rs. {clickedOrder.total.toFixed(2)}</p>
                </div>
                </div>
            </div>
            )}

            <Paginator currentPage={page} totalPages={totalPages} setCurrentPage={setPage} limit={limit} setLimit={setLimit} setLoading={setLoading} />
        </div>
    )
}