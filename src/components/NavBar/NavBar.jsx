import { Link } from "react-router-dom";
import React, { useState } from "react";
import HomePath from '../../assets/videos/home-path.mp4'
import "./NavBar.scss";
import SearchPark from "../SearchPark";
import Logo from '../../assets/images/nature-seeker-logo.png'

export default function NavBar() {
  return (
    <>
      <header className="header gradient">
        <Link to='/'>
          <img src={Logo} alt="" className="header__logo" />
        </Link>
        <ul className="header__nav ">
          <Link to='/explore' className="link"><li className="header__nav--option">Explore Parks</li></Link>
          <li className="header__nav--option">Log In</li>
          <li className="header__nav--option"></li>
          <li className="header__nav--option"></li>
        </ul>
      </header>
    </>
  );
}
