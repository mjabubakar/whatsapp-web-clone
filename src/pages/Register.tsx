import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Redirect, useHistory } from "react-router-dom";
import { REGSITER } from "../gql";
import whatsapp from "../public/whatsapp.webp";
import Loader from "../components/loader";
import IsMobile from "../components/isMobile";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [myError, setError] = useState("");
  const [profilepic, setProfilepic] = useState({});
  const [bio, setBio] = useState("");
  const history = useHistory();
  const [register, { error, loading }] = useMutation(REGSITER, {
    variables: {
      userInput: {
        email,
        fullname,
        password,
        username,
        profilepic,
        bio,
      },
    },
  });
  const onRegister = async (e: any) => {
    e.preventDefault();
    if (fullname.length < 6 || fullname.length > 25) {
      return setError("Fullname too short or too long.");
    } else if (username.length < 4 || username.length > 16) {
      return setError(
        "Username should be more than 3 characters and less than 16 characters."
      );
    } else if (bio.length > 15) {
      return setError("Bio too long");
    } else if (username.indexOf(" ") >= 0) {
      return setError("Username is invalid.");
    } else if (password.length < 6) {
      return setError("Password too short.");
    } else if (email.length < 1) {
      return setError("No email entered.");
    } else {
      setError("");
      register().then(({ data }) => {
        if (data) {
          history.push("/");
        }
      });
    }
  };
  if (localStorage.getItem("token")) return <Redirect to="/" />;
  return (
    <>
      {loading && <Loader />}
      <IsMobile />
      <div className="register">
        <img src={whatsapp} width={100} alt="whatsapp-icon" height={100} />

        <div className="error">{myError || (error && error.message)}</div>
        <form>
          <div className="input">
            <input
              style={{
                border: myError.includes("Fullname") ? "1px solid red" : "",
              }}
              placeholder="Fullname"
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
            />
          </div>
          <div
            className="input file"
            style={{
              background:
                error && error.message.includes("image") ? "red" : "#67cf53",
            }}
          >
            <label
              style={{
                color: "white",
                cursor: "pointer",
              }}
              htmlFor="input"
            >
              <span>Upload image</span>
            </label>
            <input
              type="file"
              id="input"
              accept="image/*"
              style={{
                display: "none",
              }}
              onChange={({ target: { files } }) => {
                //@ts-ignore
                const file = files[0];
                setProfilepic(file);
              }}
            />
          </div>
          <div className="input">
            <input
              style={{
                border:
                  myError.includes("Username") ||
                  (error && error.message.includes("Username"))
                    ? "1px solid red"
                    : "",
              }}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="input">
            <input
              placeholder="Bio"
              style={{
                border: myError.includes("Bio") ? "1px solid red" : "",
              }}
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
          </div>
          <div className="input">
            <input
              style={{
                border:
                  myError.includes("Email") ||
                  (error && error.message.includes("Email")) ||
                  myError.includes("Email")
                    ? "1px solid red"
                    : "",
              }}
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="input">
            <input
              style={{
                border: myError.includes("Password") ? "1px solid red" : "",
              }}
              placeholder="Password"
              name="btn"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <button style={{ marginTop: "20px" }} onClick={onRegister}>
              Register
            </button>
          </div>
          <div
            onClick={() => {
              history.push("/");
            }}
            className="text"
          >
            Already have an account? Login
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
