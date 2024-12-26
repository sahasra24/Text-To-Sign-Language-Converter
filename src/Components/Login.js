import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const [signUp, setSignUp] = useState(false);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setLoginDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignUp = () => {
    axios.post("/auth/signUp", loginDetails).then((res) => {
        if (res.data.success) {
            navigate('/Home');
        }
    });
  };

  const handleLogin = () => {
    axios
      .get("/auth/signIn/" + loginDetails.username)
      .then((res) =>  {
        if (res.data.length > 0) {
            navigate('/Home', {state: loginDetails.username})
        }
      });
  };

  const changeForm = () => {
    setSignUp(!signUp);
  };

  return (
    <div className="d-flex fullscreen align-items-center justify-content-center row">
      <div className="col-6 backgroundImage">

      </div>
      <div className="col-6 d-flex justify-content-center align-items-center flex-column">

        <div class="card login" style={{ width: "35rem" }}>
          <div className="card-header text-center">
            Enter your Login Crendentials
            </div>
          <div class="card-body">
            <label for="username">Username</label>
            <input
              id="username"
              className="form-control border-bottom"
              type="text"
              placeholder="Enter your username"
              name="username"
              value={loginDetails.username}
              onChange={handleInput}
            ></input>
            <label for="password">Password</label>
            <input
              id="password"
              className="form-control"
              type="password"
              placeholder="Enter your password"
              name="password"
              value={loginDetails.password}
              onChange={handleInput}
            ></input>
            {signUp && (
              <React.Fragment>
                <label for="password2" className="form-label">Password</label>
                <input
                  id="password2"
                  className="form-control loginInput"
                  type="password"
                  placeholder="Re-Enter your password"
                  name="password2"
                  value={loginDetails.password2}
                  onChange={handleInput}
                ></input>
              </React.Fragment>
            )}

            <div className="d-flex align-items-center">
              {signUp ? (
                <button className="btn btn-outline-dark mt-2 loginButton" onClick={handleSignUp}>
                  SignUp
                </button>
              ) : (
                <button className="btn btn-outline-dark mt-2 loginButton" onClick={handleLogin}>
                  Login
                </button>
              )}
            </div>

          </div>
          <div className="card-footer text-center">
                {signUp ? (
                <a style={{ cursor: "pointer" }} onClick={changeForm}>
                  Already have an account? Login
                </a>
              ) : (
                <a style={{ cursor: "pointer" }} onClick={changeForm}>
                  Don't have an account? Signup
                </a>
              )}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
