import { useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getSingleUser} from '../../redux/actions/userActions'
import Loader from '../loader/loader'



const Single = (props) => {

	// console.log(props)

	const dispatch = useDispatch();

	const getSingle = useSelector(state => {
		return state.getSingleUser
	})

	const {loading, user} = getSingle;

	// console.log(user)

	const location = useLocation()

	useEffect(() => {
		dispatch(getSingleUser(location.pathname))
	}, [dispatch])


	return (
		<>
		<h1>Single</h1>
		{loading && <Loader />}
		{user && (<><h2>{user.name}</h2> <h3>{user.email}</h3></>)}
		</>
	)
}

export default Single;