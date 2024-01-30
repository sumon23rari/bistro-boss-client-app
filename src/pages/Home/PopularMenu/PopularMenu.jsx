import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTItle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";

const PopularMenu = () => {
    const [menu]=useMenu();
    const popularItems=menu.filter(item=>item.category==="popular")
    // const [menu,setMenu]=useState([])
    // useEffect(()=>{
    //     fetch('menu.json')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         const PopularItems=data.filter(item=>item.category==="popular")
    //         setMenu(PopularItems)
    //     })
    // },[])

    return (
        <section className="mb-12">
            <SectionTitle
            heading={"from our menu"}
            subHeading={"popular items"}
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
            {
                popularItems.map(item => <MenuItem
                    key={item._id}
                    item={item}
                ></MenuItem>)
            }
        </div>
        <button className="btn btn-outline border-0 border-b-4 mt-4  flex justify-center">View Full Menu</button>
        </section>
    );
};

export default PopularMenu;