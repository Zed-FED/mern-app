import { useState, useEffect} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getSingleUser, editUser} from '../../redux/actions/userActions'
import Loader from '../loader/loader'
import { userUpdated } from './userSlice'


const UpdateUser = () => {
	const [userData, setUserData] = useState({
	    name: "",
	    email: ""
	  });


	// const [edit, setEdit] = useState(false)

	const inputChangeHandler = (e) => {
	    const name = e.target.name;
	    const value = e.target.value;
	    setUserData({ ...userData, [name]: value });

	  };

	const dispatch = useDispatch();

	/* Get Single User */
	const {loading, user} = useSelector(state => {
		return state.getSingleUser
	})
	

	const location = useLocation()
	const navigate = useNavigate();
	const params = useParams();


	useEffect(() => {
		dispatch(getSingleUser(params.id));
		// dispatch(fetchItems())
		
	}, [dispatch, params.id])

	const onSubmitFormHandler = (e) => {
		e.preventDefault();
		if(user.name && user.email) {
          dispatch(editUser(location.pathname, userData))
          navigate("/home")
		}
	}



	// const newObj = Object.assign(userData, { name: user ? user.name : 'Some name', email: user ? user.email : 'Some email' })
	// console.log(userData)
	
	return (
		<>
		<h1>Update User</h1>
		{loading && <Loader />}
		{user && (
			<>
			  <form onSubmit={onSubmitFormHandler}>
			    <div style={{padding: '0 0 10px'}}>
			  	  <input type="text" value={userData.name} onChange={inputChangeHandler} name="name" required />
			  	</div>
			  	<div style={{padding: '0 0 10px'}}>
			  	  <input type="text" value={userData.email} onChange={inputChangeHandler} name="email" required />
			  	</div>
			  	<button type="submit">Update</button>
			  </form>
			  <h2>{user.name}</h2>
			  <h3>{user.email}</h3>
		    </>
		)}
		</>
	)
}

export default UpdateUser;