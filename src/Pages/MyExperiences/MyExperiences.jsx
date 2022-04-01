import "./MyExperiences.scss";
import Form from "../../components/Form";
import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";


export default function MyExperiences() {
  // trying to make a login form
  const adminUser = {
    email: "admin@admin.com",
    password: "test",
  };

  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);

    if (
      details.email == adminUser.email &&
      details.password == adminUser.password
    ) {
      console.log("Logged In");
      setUser({
        name: details.name,
        email: details.email,
      });
    } else {
      console.log("Details do not match!");
      setError("Details do not match!");
    }
  };

  const Logout = () => {
    setUser({ name: "", email: "" });
  };

  return (
    <>
      <section className="experiences">
        {user.email != "" ? (
          <div className="welcome">
            <h3>
              Welcome <span>{user.name}</span>
            </h3>
            <button onClick={Logout} className="welcome__logout">
              Logout
            </button>
            <Link to='/addexperience'><button className="welcome__logout">Add my experience</button></Link>
          </div>
        ) : (
          <Form Login={Login} error={error} />
        )}
        
      </section>
    </>
  );
}
