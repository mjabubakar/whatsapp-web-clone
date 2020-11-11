import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../gql";
import { useHistory } from "react-router-dom";
import whatsapp from "../public/whatsapp.webp";
import Loader from "../components/loader";
import IsMobile from "../components/isMobile";
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [login, { error, data, loading }] = useMutation<{ login: string }>(
    LOGIN_MUTATION,
    {
      variables: { email, password },
    }
  );

  useEffect(() => {
    localStorage.removeItem("token");

    if (data) {
      localStorage.removeItem("token");
      localStorage.setItem("token", data.login);
      window.location.reload();
    }
  }, [data]);

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
  return (
    <>
    <IsMobile />
    <div className="login">
      {loading && <Loader />}
      <img alt="whatsapp-icon" src={whatsapp} width={100} height={100} />
      <div className="error">{error && error.message}</div>
      <div className="input">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input">
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>
      <div className="input">
        <button
          onClick={(e) => {
            e.preventDefault();
            email && password && login();
          }}
        >
          Login
        </button>
      </div>
      <div
        onClick={() => {
          history.push("/register");
        }}
        className="text"
      >
        Dont have an account? Register
      </div>
    </div>
    </>
  );
};

export default Login;
