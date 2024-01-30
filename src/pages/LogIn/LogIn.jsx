import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogIn from '../../components/SocialLogIn/SocialLogIn';
const LogIn = () => {
  const [disabled,setDisabled]=useState(true)
  const {signIn}=useContext(AuthContext)
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
console.log('state in the location logIn page',location?.state)

    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])
    const handleLogIn=e=>{
        e.preventDefault()
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;
        console.log(email,password)
        signIn(email,password)
        .then((userCredential) => {
         
          const user = userCredential.user;
          Swal.fire({
            title: "The Internet?",
            text: "That thing is still around?",
            icon: "question"
          });
          navigate(from, { replace: true });
        console.log('user',user)
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log('errorMessage',errorMessage)
        });

    }
    const handleValidatedCaptcha=(e)=>{
    const userCaptchaValue=e.target.value;
      
  
     if (validateCaptcha(userCaptchaValue)) {
       setDisabled(false)
      }
        else{
        setDisabled(true)
       }
    }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center md:w-1/2">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card card-body shrink-0 md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form className="" onSubmit={handleLogIn}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label> 
                <input type="email" name="email" placeholder="email" className="input input-bordered"  />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered"  />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
                <label className="label border p-2 mb-3">
                <LoadCanvasTemplate />
                </label>
                <input type="text" onBlur={handleValidatedCaptcha}  placeholder="type the captcha above" name="captcha" className="input input-bordered" required />
                
              </div>
              <div className="form-control mt-6">
              <input  className="btn btn-primary" disabled={false} type="submit" value="login"/>
               
              </div>
            </form>
            <p className='capitalize'><small>new year?<Link to="/register">create an account</Link></small></p>
            <SocialLogIn></SocialLogIn>
          </div>
        </div>
      </div>
    );
};

export default LogIn;