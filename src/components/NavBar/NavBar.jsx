import { Link } from "react-router-dom";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./NavBar.scss";

export default function NavBar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setNavbarOpen(false);
  };
  return (
    <>

      <header className="header gradient">
        <h3 className="header__title">Nature Seeker</h3>
        <button onClick={handleToggle}>{navbarOpen ? "Close" : "Open"}</button>
        <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`} >
          <li className="header__mob--option">Option1</li>
          <li className="header__mob--option">Option2</li>
          <li className="header__mob--option">Option3</li>
          <li className="header__mob--option">Option4</li>
        </ul>
        <ul className="header__nav ">
          <li className="header__nav--option">Option1</li>
          <li className="header__nav--option">Option2</li>
          <li className="header__nav--option">Option3</li>
          <li className="header__nav--option">Option4</li>
        </ul>
      </header>
    </>
  );
}
