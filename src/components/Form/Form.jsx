import "./Form.scss";
import { useState } from "react";
import React from "react";

export default function Form({ Login, error }) {
    const [details, setDetails] =  useState({name: '', email: '', password: ''});

    const submitHandler = e => {
      e.preventDefault();

      Login(details);
    }
  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2>Login</h2>
          {(error != '') ? (<div className="form__error">{error}</div>) : '' }
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              value={details.name}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              value={details.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="text"
              name="password"
              id="password"
              onChange={(e) => setDetails({ ...details, password: e.target.value })}
              value={details.password}
            />
          </div>
          <input type="submit" value="LOGIN" />
        </div>
      </form>
    </>
  );
}
