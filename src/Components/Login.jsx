import React,{useState} from 'react'
import { useNavigate  } from "react-router-dom";
import { Link } from 'react-router-dom';
const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate =useNavigate ();

    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value}) //this is mainly use to reflect the change in words on frontend
      } 
    const handleSubmit=async(e)=>{
       e.preventDefault();
       const response = await fetch(
        `http://localhost:5000/api/auth/login`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type":"application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({email:credentials.email,password:credentials.password}), // body data type must match "Content-Type" header
        }
      );
      const json=await response.json();
        if(json.success){
        //save auth-token and redirect
        localStorage.setItem('token',json.authToken)
        props.showAlert("You are successfully Logged in!","success")
        navigate("/");
      }
      else{
        props.showAlert("Check Your Credentials!","danger")
      }
    }
  return (
    <div className="container">
      <h2 className="text-center">Login Your Account</h2>
        <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onchange} placeholder="Enter Your Email" aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" name="password" value={credentials.password} className="form-control" placeholder="Enter your Password" onChange={onchange} id="password"/>
      </div>
      <p > Not an Account? <Link to="/signup">Sign Up</Link> </p>
      <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
</div>
  )
}

export default Login