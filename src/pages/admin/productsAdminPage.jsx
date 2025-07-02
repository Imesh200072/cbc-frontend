import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function ProductAdminPage(){
    return(
        <div className="w-full h-full border-[3px]">
            <Link to={"/admin/newProduct"} className="fixed right-[60px] bottom-[60px] text-white bg-black p-[18px] rounded-full shadow-2xl">
                <BiPlus className="text-3xl "/>
            </Link>
        </div>
    )
}