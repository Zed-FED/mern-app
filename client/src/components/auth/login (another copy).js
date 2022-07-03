import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import Loader from '../loader/loader'
const Login = () => {

	const [user, setUser] = useState({
		email: "",
		password: ""
	}) 

	const [loading, setLoading] = useState(false);

	let navigate = useNavigate();

	const inputChangeHandler = (e) => {
	    const name = e.target.name;
	    const value = e.target.value;
	    setUser({ ...user, [name]: value });
	};

	const onSubmitFormHandler = async (e) => {
	    e.preventDefault();

	    try {
	    	setLoading(true)

	    	const url = "http://localhost:8000/login";
	    	const credentials = { email: user.email, password: user.password };

    	    axios
		      .post(url, credentials)
		      .then((response) => {
		        const result = response.data;
		        const { status, message } = result;
		        if (status !== "LOGIN SUCCESS") {
		          alert(message, status);
		        } else {
		        	console.log(result.data);
		        	localStorage.setItem('User Info', JSON.stringify(result.data))
		        	setLoading(false)
		          // alert(message);
		          // window.location.reload();
		          navigate("/home/single/", { replace: true });
		        }
		      })
		      .catch((error) => {
		        console.log(error);
		      });

	    	
	    } catch(error) {

	    }
	}


	useEffect(() => {
		const userInfo = localStorage.getItem('User Info');

		if(userInfo) {
			navigate("/home/single/", { replace: true });
		}
	}, [navigate])


	return (
	  <div>
	  {loading && <Loader />}
	  	<form onSubmit={onSubmitFormHandler}>
	  		<div>
	  			<input type="text" placeholder="Enter email" value={user.email} name="email" onChange={inputChangeHandler} required />
	  		</div>
	  		<div>
	  			<input type="password" placeholder="Enter password" value={user.password} name="password" onChange={inputChangeHandler} required />
	  		</div>
	  		<button type="submit">Login</button>
	  	</form>

	  	New user? <Link to="/register">Register here</Link>
	  </div>	
	)
}

export default Login;