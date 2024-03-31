import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import auth from "../firebase";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [showError, setShowError] = useState();
  const [success, setSuccess] = useState();
  const [showPass, setShowPass] = useState(true);
  const emailRef = useRef(null);

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (password.length < 6) {
      setShowError("PassWord Should be at least 6 charecter!!");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setShowError("PassWord must be one upercase!!");
      return;
    }

    //reset user
    setShowError(" ");
    setSuccess(" ");

    //sign in
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // const user = res.user;
        // console.log(res.user);

        //email verified
        if(res.user.emailVerified){
            setSuccess("Successfully sign in your account");
        }
        else{
          alert('please verified you email..');
        }

      })
      .catch((error) => {
        const errorMessage = error.message;
        setShowError(errorMessage);
      });
  };

  //handle Forgot Password
  const handleForgotPass = ()=>{
    const email = emailRef.current.value;
    if(!email){
        alert('please provide an email!!');
        return;
    }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        alert('please write a valied email');
        return;
    }

    //send validetion email
    sendPasswordResetEmail(auth, email)
    .then(()=> alert('check your email'))
    .catch(error =>{
        const errorMessage = error.message;
    })

  }

  return (
    <div>
      <Helmet>
        <title>Email | sign in</title>
      </Helmet>

      <div className="mt-10 text-center bg-[#3e00e75d]">
        <h1 className="text-4xl font-semibold p-5">Sign In</h1>
      </div>
      <div className="hero bg-base-200 ">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100 my-10">
          <form className="card-body" onSubmit={handleSignIn}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <div className="input input-bordered flex items-center justify-between">
                <input
                  name="password"
                  type={showPass ? "password" : "text"}
                  placeholder="password"
                  required
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="cursor-pointer"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <label onClick={handleForgotPass} className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div>
              <input type="checkbox" name="terms" id="" required />
              <label htmlFor="terms" className="ml-2">
                accept our <a href="#">trems and condition</a>
              </label>
            </div>

            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign in"
              />
            </div>
            <p>
              If you new to this website?{" "}
              <Link to="/signup" className="underline">
                Please Sign up
              </Link>
            </p>
          </form>
          {showError && <p className="text-red-600 pl-8 pb-5">{showError}</p>}
          {success && <p className="text-green-600 pl-8 pb-5">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
