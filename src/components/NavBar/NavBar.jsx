import { Link } from "react-router-dom";
import React, { useState } from "react";
import HomePath from '../../assets/videos/home-path.mp4'
import "./NavBar.scss";
import SearchPark from "../SearchPark";
import Logo from '../../assets/images/nature-seeker-logo.png'
import Form from "../Form";
import { deprecatedPropType } from "@mui/material";

export default function NavBar() {
  
  // trying to make a login form
  const adminUser = {
    email: "admin@admin.com",
    password: "test",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if (details.email == adminUser.email && details.password == adminUser.password) {
        console.log('Logged In');
        setUser({
          name: details.name,
          email: details.email
        }); 
    } else {
      console.log('Details do not match!')
      setError("Details do not match!");
    }
  };

  const Logout = () => {
    setUser({ name: '', email: ''});
  };

  return (
    <>
      <header className="header gradient">
        <Link to="/">
          <img src={Logo} alt="" className="header__logo" />
        </Link>
        <ul className="header__nav ">
          <Link to="/explore" className="link">
            <li className="header__nav--option">Explore Parks</li>
          </Link>
          <li className="header__nav--option">Weather</li>
          <li className="header__nav--option">Search Trails</li>
          <li className="header__nav--option">
            {(user.email != "") ? (
              <div>
              <h2>Welcome, <span>{user.name}</span></h2>
              <button onClick={Logout}>Logout</button>
              </div>
            ) : (
              <Form Login={Login} error={error} />
            )}
          </li>
        </ul>
      </header>
    </>
  );
}
