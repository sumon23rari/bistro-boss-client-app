import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogIn = () => {
    const {googleSignIn}=useContext(AuthContext);
    const axiosPublic=useAxiosPublic();
    const navigate=useNavigate();
    const location=useLocation();
      let from = location.state?.from?.pathname || "/";
    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then((result)=>{
            console.log(result.user)
            const userInfo={
                name:result.user?.displayName,
                email:result.user?.email
            }
            axiosPublic.post('/users',userInfo)
            .then((res)=>{
                console.log(res.data)
                const insertedId=res.data?.insertedId;
               
                navigate('/')
            })
            .catch(()=>{})
        })
        .catch(()=>{})
    }
    return (
        <div className="p-8">
        <div className="divider"></div>
        <div>
            <button onClick={handleGoogleSignIn} className="btn">
                <FaGoogle className="mr-2"></FaGoogle>
                Google
            </button>
        </div>
    </div>
    );
};

export default SocialLogIn;