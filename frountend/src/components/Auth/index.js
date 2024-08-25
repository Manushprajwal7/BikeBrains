import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import GoogleIcon from "@mui/icons-material/Google";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../frebase/firebase";

function Index() {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSigninGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const handleRegister = () => {
    setError("");
    setLoading(true);
    if (email === "" || password === "" || username === "") {
      setError("Required field is missing");
      setLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setLoading(false);
          navigate("/");
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setLoading(false);
        });
    }
  };

  const handleSignin = () => {
    setError("");
    setLoading(true);
    if (email === "" || password === "") {
      setError("Required field is missing");
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          navigate("/");
          console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.code);
          setError(err.message);
          setLoading(false);
        });
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <h2>BikeBrains</h2>
        <div className="sign-options">
          <div onClick={handleSigninGoogle} className="single-option">
            <GoogleIcon />
            <p>Login with Google</p>
          </div>
        </div>
        <div className="auth-login">
          <div className="auth-login-container">
            {register ? (
              <>
                <div className="input-field">
                  <p>Username</p>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button onClick={handleRegister} disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </>
            ) : (
              <>
                <div className="input-field">
                  <p>Email</p>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-field">
                  <p>Password</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button onClick={handleSignin} disabled={loading}>
                  {loading ? "Signing in..." : "Login"}
                </button>
              </>
            )}
            <p onClick={() => setRegister(!register)}>
              {register ? "Login" : "Register"}
            </p>
          </div>
        </div>
        {error && <p style={{ color: "red", fontSize: "18px" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Index;
