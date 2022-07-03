import { useEffect} from 'react';
// import {useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {logOut, getUsers} from '../../redux/actions/userActions'
import Loader from '../loader/loader'
import { useNavigate } from 'react-router-dom';
const Home = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	

	const getAllUsers = useSelector(state => {
		return state.getUsers
	})
	const {loading, users} = getAllUsers;

	// console.log(getAllUsers)



	const onLogOut = () => {

		dispatch(logOut())

		// localStorage.removeItem('User Info');
		navigate("/")
	}


	useEffect(() => {
		dispatch(getUsers())
	}, [dispatch])


	const tableStyle = {
		width: '100%',
		maxWidth: '600px',
		margin: '20px auto auto'
	}

	const viewUser = (id) => {
		navigate(`/${id}`)
	}

	const editUser = (id) => {
		navigate(`/edit/${id}`)
	}




	return (
		<>
		  <h1>Home</h1>
		  <button onClick={onLogOut}>Log Out</button>
		  {loading && <Loader />}

		  <table style={tableStyle}>
		  	<thead>
		  		<tr>
		  			<th>User</th>
		  			<th>Email</th>
		  			<th>Actions</th>
		  		</tr>
		  	</thead>
		  	<tbody>
		  		{users && users.map((user) => {
				  	return (
				  		<tr key={user._id}>
				  			<td>{user.name}</td>
				  			<td>{user.email}</td>
				  			<td>
				  				<button onClick={() => viewUser(user._id)}>View</button>
				  				<button onClick={() => editUser(user._id)}>Edit</button>
				  				<button>Delete</button>
				  			</td>
				  		</tr>
				  		)
				  })}
		  	</tbody>
		  </table>
		  
		</>
	)
}

export default Home;