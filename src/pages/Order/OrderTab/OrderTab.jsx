import FoodCart from "../../../components/FoodCart/FoodCart";

const OrderTab = ({items}) => {
    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {
         items.map((item)=><FoodCart
         key={item._id}
         item={item}
         ></FoodCart>)
       }
        </div>
    );
};

export default OrderTab;