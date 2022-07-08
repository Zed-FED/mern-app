import {useState} from 'react'
import Modal from './modal'
const ListItem = ({_id, name, email, viewUser, editUser, deleteSingleUser, ...otherProps}) => {
	const [isModal, setIsModal] = useState(false)
	return (
		<>
			<tr {...otherProps}>
	  			<td>{name}</td>
	  			<td>{email}</td>
	  			<td>
	  				<button onClick={() => viewUser(_id)}>View</button>
	  				<button onClick={() => editUser(_id)}>Edit</button>
	  				{/* <button onClick={() => deleteSingleUser(user._id)}>Delete</button> */}
	  				<button onClick={() => setIsModal(true)}>Delete</button>
	  				
	  			</td>
	  		</tr>

	  		{isModal && (<Modal>
				<h1>Are you sure you want to delete <span style={{color: 'purple'}}>{name}</span>? </h1>
		  		<button onClick={() => setIsModal(false)}>Cancel</button>
		  		<button onClick={() => deleteSingleUser(_id)}>Confirm</button>
			</Modal>)}
		</>
		)
}

export default ListItem;