import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SocialLogIn from "../../components/SocialLogIn/SocialLogIn";

const SignUp = () => {
  const { register, handleSubmit,reset, watch, formState: { errors } } = useForm();
  const navigate=useNavigate();
  const axiosPublic=useAxiosPublic()
  const {createUser,userProfile}=useContext(AuthContext)
  const onSubmit = data => {
    createUser(data.email,data.password)
    .then(result=>{
      const loggedUser=result.user;
      console.log(loggedUser)
      userProfile(data.name,data.photo)
      .then(()=>{
        console.log('user profile update')
        const userInfo={
            name:data.name,
            email:data.email,
            photo:data.photo
        }
        axiosPublic.post('/users',userInfo)
        .then(res=>{
            if (res.data.insertedId) {
                reset()
                Swal.fire({
                    position:'middle',
                    title: "User create successfully?",
                    text: "That thing is still around?",
                    icon: "success",
                    showConfirmButton:false,
                    timer:1500
                  });
                navigate('/')
            }
        })
       
        
      })
      .catch(()=>{
        alert('error this code')
      })
    })
  };
 
    return (
      <>
      <Helmet>
          <title>Bistro Boss | Sign Up</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                  <h1 className="text-5xl font-bold">Sign up now!</h1>
                  <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              </div>
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 card-body">
                  <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-control">
                          <label className="label">
                              <span className="label-text">Name</span>
                          </label>
                          <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                          {errors.name && <span className="text-red-600">Name is required</span>}
                      </div>
                      <div className="form-control">
                          <label className="label">
                              <span className="label-text">photo-url</span>
                          </label>
                          <input type="text"  {...register("photo", { required: true })} name="photo" placeholder="photo url" className="input input-bordered" />
                          {errors.photo && <span className="text-red-600">photo-url is required</span>}
                      </div>
                     
                      <div className="form-control">
                          <label className="label">
                              <span className="label-text">Email</span>
                          </label>
                          <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                          {errors.email && <span className="text-red-600">Email is required</span>}
                      </div>
                      <div className="form-control">
                          <label className="label">
                              <span className="label-text">Password</span>
                          </label>
                          <input type="password"  {...register("password", {
                              required: true,
                              minLength: 6,
                              maxLength: 10,
                              pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                          })} placeholder="password" className="input input-bordered" />
                          {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                          {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                          {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 10 characters</p>}
                          {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                          <label className="label">
                              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                          </label>
                      </div>
                      <div className="form-control mt-6">
                          <input className="btn btn-primary" type="submit" value="Sign Up" />
                      </div>
                  </form>
                  <p className="px-6"><small>Already have an account <Link to="/login">Login</Link></small></p>
                 <SocialLogIn></SocialLogIn>
              </div>
          </div>
      </div>
  </>
    );
};

export default SignUp;