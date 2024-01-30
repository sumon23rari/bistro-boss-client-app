import { Link } from "react-router-dom";
import Cover from "../Shared/Cover/Cover";
import MenuItem from "../Shared/MenuItem/MenuItem";

const MenuCategory = ({items,title,img}) => {
    console.log(('title'),title)
    return (
        <div>
        {
            title && <Cover img={img} title={title}></Cover>
        }
        <div className="grid md:grid-cols-2 gap-10 p-12">
     {
        items.map(item=><MenuItem
            key={item._id}
            item={item}
            ></MenuItem>)
     }
    </div>
    <div className="flex justify-center md:my-10 my-5">
    <Link to={`/order/${title}`}>
    <button className="btn btn-outline uppercase font-bold border-0 border-b-4 mt-4">Order Now</button>
    </Link>
    </div>
        </div>
    );
};

export default MenuCategory;