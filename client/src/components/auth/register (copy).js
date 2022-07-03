import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Loader from '../loader/loader'
const Register = () => {
	const [user, setUser] = useState({
		name: "",
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

	    	const url = "/users";
	    	const credentials = { name: user.name, email: user.email, password: user.password };

    	    axios
		      .post(url, credentials)
		      .then((response) => {
		        const result = response.data;
		        const { status, message } = result;
		        if (status !== "SUCCESS") {
		          alert(message, status);
		        } else {
		        	// console.log(result.data);
		        	localStorage.setItem('User Info', JSON.stringify(result.data))
		        	setLoading(false)
		          // alert(message);
		          // window.location.reload();
		          navigate("/", { replace: true });
		        }
		      })
		      .catch((error) => {
		        console.log(error);
		      });

	    	
	    } catch(error) {

	    }
	}
	return (
	  <form onSubmit={onSubmitFormHandler}>
	  		<div>
	  			<input type="text" placeholder="Enter name" value={user.name} name="name" onChange={inputChangeHandler} required />
	  		</div>
	  		<div>
	  			<input type="text" placeholder="Enter email" value={user.email} name="email" onChange={inputChangeHandler} required />
	  		</div>
	  		<div>
	  			<input type="password" placeholder="Enter password" value={user.password} name="password" onChange={inputChangeHandler} required />
	  		</div>
	  		<button type="submit">Register</button>
	  	</form>	
	)
}

export default Register;