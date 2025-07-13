import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus, BiTrash } from "react-icons/bi";
import { Link,  useNavigate } from "react-router-dom";

const sampleProducts = [

  {
    productId: "COSM001",
    name: "Radiant Glow Face Cream",
    altNames: ["Brightening Cream", "Day Cream"],
    labelledPrice: 2499,
    price: 1999,
    images: ["/images/glow-face-cream.jpg"],
    description: "A hydrating face cream that brightens your skin and gives a natural glow.",
    stock: 150,
    isAvailable: true,
    category: "cosmatics"
  },
  {
    productId: "COSM002",
    name: "Velvet Matte Lipstick - Rose Red",
    altNames: ["Red Lipstick", "Matte Lipstick"],
    labelledPrice: 1599,
    price: 1299,
    images: ["/images/rose-red-lipstick.jpg"],
    description: "A smooth, long-lasting matte lipstick that enhances your lips with bold color.",
    stock: 200,
    isAvailable: true,
    category: "cosmatics"
  },
  {
    productId: "COSM003",
    name: "Natural Kajal Eyeliner",
    altNames: ["Black Kajal", "Eye Pencil"],
    labelledPrice: 799,
    price: 649,
    images: ["/images/natural-kajal.jpg"],
    description: "Soft and smudge-proof kajal eyeliner made from natural ingredients for sensitive eyes.",
    stock: 100,
    isAvailable: true,
    category: "cosmatics"
  },
  {
    productId: "COSM004",
    name: "Herbal Shampoo - Aloe & Neem",
    altNames: ["Anti-Dandruff Shampoo", "Herbal Hair Cleanser"],
    labelledPrice: 899,
    price: 749,
    images: ["/images/herbal-shampoo.jpg"],
    description: "An herbal shampoo enriched with aloe vera and neem extracts for healthy hair.",
    stock: 80,
    isAvailable: true,
    category: "cosmatics"
  },
  {
    productId: "COSM005",
    name: "Sunscreen SPF 50+ PA+++",
    altNames: ["Sunblock", "UV Protection Lotion"],
    labelledPrice: 1199,
    price: 999,
    images: ["/images/sunscreen-spf50.jpg"],
    description: "Broad-spectrum sunscreen that protects your skin from harmful UVA & UVB rays.",
    stock: 120,
    isAvailable: true,
    category: "cosmatics"
  }
];


export default function ProductAdminPage(){
    const [products,setProducts] = useState(sampleProducts)
    const [a,setA] = useState(0)
    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                (res)=>{
                    setProducts(res.data)
                }
            )
        },
        [a]
    )
    const navigate = useNavigate()

    return(
        <div className="w-full h-full border-[3px]">
            <table>
                <thead>
                    <tr>
                        <th className="p-[10px]">Image</th>
                        <th className="p-[10px]">Product ID</th>
                        <th className="p-[10px]">Name</th>
                        <th className="p-[10px]">Price</th>
                        <th className="p-[10px]">Labelled Price</th>
                        <th className="p-[10px]">Category</th>
                        <th className="p-[10px]">Stock</th>
                        <th className="p-[10px]">Actions</th>
                    
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map(
                            (product,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>
                                            <img src={product.images[0]} alt={product.name} className="w-[50px] h-[50px]"/>
                                            
                                        </td>
                                        <td className="p-[10px]">{product.productId}</td>
                                        <td className="p-[10px]">{product.name}</td>
                                        <td className="p-[10px]">{product.price}</td>
                                        <td className="p-[10px]">{product.labelledPrice}</td>
                                        <td className="p-[10px]">{product.category}</td>
                                        <td className="p-[10px]">{product.stock}</td>
                                        <td className="p-[10px]">
                                            <BiTrash className="bg-red-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-red-500 cursor-pointer" onClick={
                                                ()=>{
                                                    const token = localStorage.getItem("token")
                                                    if(token == null){
                                                        navigate("/login")
                                                        return
                                                    }
                                                    axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/"+product.productId,
                                                        {
                                                            headers:{
                                                                Authorization: `Bearer ${token}`
                                                            }
                                                        }
                                                    ).then(
                                                        (res)=>{
                                                            console.log("Product deleted successfully")
                                                            console.log(res.data)
                                                            toast.success("Product deleted successfully")
                                                            setA(a+1)
                                                        }
                                                    ).catch(
                                                        (error)=>{
                                                            console.error("Error deleting product:", error)
                                                            toast.error("Failed to delete product")
                                                        }
                                                    )
                                                }
                                            }/>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>

            </table>
            <Link to={"/admin/newProduct"} className="fixed right-[60px] bottom-[60px] text-white bg-black p-[18px] rounded-full shadow-2xl">

                <BiPlus className="text-3xl "/>
            </Link>
        </div>
    )
}

