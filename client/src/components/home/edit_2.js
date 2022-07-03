import { useState, useEffect} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers, editUser, getSingleUser} from '../../redux/actions/userActions'
import Loader from '../loader/loader'
// import { userUpdated } from './userSlice'
import {connect} from 'react-redux'
import {getUser} from '../../redux/selectors/userSelector'


const UpdateUser = (props) => {


	const [user, setUser] = useState(props.user)


	const params = useParams();

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSingleUser(params.id))
		setUser(props.user)
		// setName(user?.name)
	}, [dispatch, params.id, props.user])

	// const userDetail = useSelector(state => {
	// 	return state.getUsers.users.find(user => user._id === params.id)
	// })

	const getSingle = useSelector(state => {
		return state.getSingleUser
	})



	// const {loading, user} = getSingle;

	// console.log(user?.name)

	const [name, setName] = useState("")
    const [email, setEmail] = useState("")
	
	
  	const navigate = useNavigate()

  	const onNameChanged = e => setName(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)

    

	return (
		<>
		<h1>Update User</h1>
		
			  <form>
			    <div style={{padding: '0 0 10px'}}>
			  	  <input type="text" value={name} onChange={onNameChanged} name="name" required />
			  	</div>
			  	<div style={{padding: '0 0 10px'}}>
			  	  <input type="text" value={email} onChange={onEmailChanged} name="email" required />
			  	</div>
			  	<button type="submit">Update</button>
			  </form>
			
		</>
	)
}


const makeStateToProps = () => {
	const user = getUser()
	return (state, props) => {
		return {
			user: user(state, props.match.params.id)
		}
	}
}

export default connect(makeStateToProps) (UpdateUser);