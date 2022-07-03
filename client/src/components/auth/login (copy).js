import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Login = () => {
	const [user, setUser] = useState({
		name: "",
		email: ""
	})

	const [id, setId] = useState('')

	let navigate = useNavigate();

	const inputChangeHandler = (e) => {
	    const name = e.target.name;
	    const value = e.target.value;
	    setUser({ ...user, [name]: value });
	  };

	// const onSubmitFormHandler = (e) => {
	//     e.preventDefault();
	//     // const url = "http://localhost:8000/users";
	//     const credentials = { name: user.name, email: user.email };
	//     axios
	//       .post("/users", credentials)
	//       .then((response) => {
	//         const result = response.data;
	//         const { status, message } = result;
	//         if (status !== "SUCCESS") {
	//           alert(message, status);
	//         } else {
	//           alert(message);
	//           // window.location.reload();
	//           navigate("/home", { replace: true });
	//         }
	//       })
	//       .catch((error) => {
	//         console.log(error);
	//       });
	//   };  

	const onSubmitFormHandler = (e) => {
		e.preventDefault();
		const url = `/users/${id}`;
		const credentials = { name: user.name, email: user.email };
		axios.get(url, credentials)
    	  .then((response) => {
    	  	const result = response.data;
        	const { status, message } = result;

	        if (status !== "SUCCESS") {
	          alert(message, status);
	        } else {
	          alert(message);
	          // window.location.reload();
	          navigate("/home", { replace: true });
	        }
    	  })
    	  .catch((error) => {
	        console.log(error);
	      });
	}  
	return (
	  <div>
	  	<form onSubmit={onSubmitFormHandler}>
	  		<div>
	  			<input type="text" placeholder="Enter name" value={user.name} name="name" onChange={inputChangeHandler} required />
	  		</div>
	  		<div>
	  			<input type="text" placeholder="Enter email" value={user.email} name="email" onChange={inputChangeHandler} required />
	  		</div>
	  		<button type="submit">Login</button>
	  	</form>
	  </div>	
	)
}

export default Login;