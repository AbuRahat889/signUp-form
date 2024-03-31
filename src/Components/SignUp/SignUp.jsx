import { createUserWithEmailAndPassword } from "firebase/auth";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import auth from "../firebase";

const SignUp = () => {
  const [showError, setShowError] = useState();
  const [success, setSuccess] = useState();
  const [showPass, setShowPass] = useState(true);

  const handleSignUp = (e) => {
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

    //user create
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // const user = res.user;
        console.log(res.user);
        setSuccess("Successfully create your account");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setShowError(errorMessage);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Email | sign up</title>
      </Helmet>
      <div className="hero bg-base-200 mt-10">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100 my-10">
          <form className="card-body" onSubmit={handleSignUp}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
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

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div>
              <input type="checkbox" name="terms" id="" required/>
              <label htmlFor="terms" className="ml-2">
                accept our <a href="#">trems and condition</a>
              </label>
            </div>

            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign up"
              />
            </div>
          </form>
          {showError && <p className="text-red-600 pl-8 pb-5">{showError}</p>}
          {success && <p className="text-green-600 pl-8 pb-5">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
