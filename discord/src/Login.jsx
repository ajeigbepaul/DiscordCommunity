import { Button } from "@mui/material";
import React from "react";
import "./Login.css";
import { signInWithGoogle } from "./firebase";

function Login() {
  const signIn = () => {
    signInWithGoogle();
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img src="discord.png" alt="logo" />
      </div>
      <Button className="login__btn" onClick={signIn}>
        {" "}
        Sign in
      </Button>
    </div>
  );
}

export default Login;
