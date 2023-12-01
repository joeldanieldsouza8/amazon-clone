import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"; // Import the functions from Firebase auth

function Login() {
  const navigate = useNavigate(); // This is used to programmatically change the URL

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSignIn(event) {
    event.preventDefault();

    // Firebase sign in logic...
    try {
      // Use the imported signInWithEmailAndPassword function
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);

      // If the user is successfully signed in, redirect to the home page
      if (userCredential) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();

    // Firebase register logic...
    try {
      // Use the imported createUserWithEmailAndPassword function
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredential;
      console.log(user);

      // If the user is successfully created, redirect to the home page
      if (user) {
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>

      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={handleEmailChange} />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="login__signInButton" onClick={handleSignIn}>
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to Amazon's Conditions of Use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads
          Notice.
        </p>

        <button className="login__registerButton" onClick={handleRegister}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
