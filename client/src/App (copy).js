import {useState, useEffect} from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const getUsers = async() => {
    axios.get('/users').then((response) => {
      const result = response.data;
      const {status, message, data} = result;
      if(status !== 'SUCCESS') {
        alert(message);
      } else {
        setUsers(data)
        console.log(data);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    getUsers()
  },[])

  return (
    <div className="App">
      {users.map((user) => {
        return(
          <div key={user._id}>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
          )
      })}
    </div>
  );
}

export default App;
