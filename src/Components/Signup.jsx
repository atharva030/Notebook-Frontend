import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); //this is mainly use to reflect the change in words on frontend
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      const { name, email, password } = credentials;

      const response = await fetch(
        `http://localhost:5000/api/auth/createuser`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
        }
      );
      const json = await response.json();
      console.log(json);
      if (json.success) {
        //save auth-token and redirect
        // localStorage.setItem("token", json.authToken);
        e.preventDefault();
        props.showAlert("Account Created Successfully!!", "success");
        navigate("/login");
      } else {
        props.showAlert("Invalid Credentials", "danger");
      }
    } else {
      props.showAlert(
        "Confirm Password must be same as the password",
        "danger"
      );
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            value={credentials.name}
            name="name"
            id="name"
            aria-describedby="emailHelp"
            onChange={onchange}
            placeholder="Enter Your Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            name="email"
            id="email"
            onChange={onchange}
            placeholder="Enter Your Email "
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            name="password"
            id="password"
            onChange={onchange}
            placeholder="Enter Your Password"
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.cpassword}
            name="cpassword"
            id="cpassword"
            onChange={onchange}
            minLength={5}
            placeholder="Confirm Your Password"
            required
          />
        </div>
        <p>
          {" "}
          Already have an Account? <Link to="/login">Login</Link>{" "}
        </p>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
