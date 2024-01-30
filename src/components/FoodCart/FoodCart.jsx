import Swal from "sweetalert2";

import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";

const FoodCart = ({item}) => {
    const {name, image, price, recipe,_id} = item;
    const {user}=useContext(AuthContext);
    const axiosSecure=useAxiosSecure()
    console.log('user',user?.email)
    const navigate=useNavigate();
    const location=useLocation();
    const [,refetch]=useCart();
    const handleAddToCart=()=>{
      if (user && user?.email) {
      const cartItem={
        menuId:_id,
        email:user?.email,
        name,
        image,
        price
      }
      axiosSecure.post('/cart',cartItem)
     .then(res=>{
      console.log(res.data)
      if (res.data.insertedId) {
        Swal.fire({
          position: "middle",
          icon: "success",
          title: "Your selected food save on cart",
          showConfirmButton: false,
          timer: 1500
        });
        refetch()
      }
     })
      // .catch(function (error) {
      //   console.log(error);
      // });
      }
      else{
        Swal.fire({
          title: "You are not logged In",
          text: "Please LogIn to add to the cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Log In!"
        })
        .then((result) => {
          if (result.isConfirmed) {
          navigate('/logIn',{state:{from:location}})
          }
        });
      }
     
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl relative ">
        <figure><img src={image} alt="Shoes" /></figure>
        <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">{price}</p>
        <div className="card-body flex flex-col items-center">
       
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <button
            onClick={handleAddToCart}
            className="btn btn-outline uppercase font-bold border-0 border-b-4 mt-4 border-orange-400 bg-slate-100">Buy Now</button>
          </div>
        </div>
      </div>
    );
};

export default FoodCart;