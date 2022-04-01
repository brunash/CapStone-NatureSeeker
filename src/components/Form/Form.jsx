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
          <h3 className="form__input--title">Login</h3>

          <div className="form__input">
            <label htmlFor="name" className="form__input--label">
              Name:{" "}
            </label>
            <input
              className="form__input--field"
              type="text"
              name="name"
              id="name"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              value={details.name}
            />
          </div>
          <div className="form__input">
            <label htmlFor="email" className="form__input--label">
              Email:{" "}
            </label>
            <input
              className="form__input--field"
              type="text"
              name="email"
              id="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
          </div>
          <div className="form__input">
            <label htmlFor="password" className="form__input--label">
              Password:{" "}
            </label>
            <input
              className="form__input--field"
              type="text"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
          
        </div>
        <input type="submit" value="LOGIN" className="form__login" />
        {error != "" ? <div className="form__error">{error}</div> : ""}
      </form>
    </>
  );
}
