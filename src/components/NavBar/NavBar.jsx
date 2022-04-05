import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./NavBar.scss";
import Logo from '../../assets/images/logo.png'
import { useContext } from "react";
import TheContext from "../TheContext/TheContext";

export default function NavBar(props) {
  
  useEffect(() => {
    getTheUser();
  }, []);

let { getTheUser } = useContext(TheContext);
  let { user, setUser } = useContext(TheContext);
  console.log(user, 'navbar')

  return (
    <>
      <header className="header">
        <Link to="/">
          <img src={Logo} alt="" className="header__logo" />
        </Link>
        <ul className="header__nav ">
          <li className="header__nav--option">
            <Link to="/explore" className="link">
              Explore Parks
            </Link>
          </li>
          <li className="header__nav--option"><Link to="/allposts">Experiences</Link></li>
          <div className="header__nav--option">
            {user?._id ? (
              <ul className="header__nav--login">
                <li>
                  <Link to="/profile" className="link">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/addPost" className="link">
                    Post
                  </Link>
                </li>
              </ul>
            ) : (
              <Link to="/auth" className="link">
                Login
              </Link>
            )}
          </div>
        </ul>
      </header>
    </>
  );
}
