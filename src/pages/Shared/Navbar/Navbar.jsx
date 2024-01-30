import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
const Navbar = () => {
  const {user,logOut}=useContext(AuthContext);
  const [cart]=useCart()
  const handleLogOut=()=>{
    logOut()
    .then(()=>{

    })
    .catch(error=>{
      console.log(error)
    })
  }
  const navOption = <>
  <li><Link to="/">Home</Link></li>
  <li><Link to="/menu">Our Menu</Link></li>
  <li><Link to="/order/salad">Order Food</Link></li>
  <li><Link to="/secret">Secret</Link></li>
  <li>
      <Link to="/dashboard/cart">
          <button className="btn">
              <FaShoppingCart className="mr-2"></FaShoppingCart>
              <div className="badge badge-secondary">+{cart.length}</div>
          </button>
      </Link>
  </li>
  {
      user ? <>
          {/* <span>{user?.displayName}</span> */}
          <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
      </> : <>
          <li><Link to="/logIn">Login</Link></li>
      </>

  }
</>
    return (
        <div>
        <div className="navbar fixed z-10 bg-opacity-20 bg-black text-white max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navOption}
            </ul>
          </div>
        <span className="font-bold text-xl">bistro boss</span>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
         {navOption}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div> 
        </div>
    );
};

export default Navbar;