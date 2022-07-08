import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/auth/login'
import Register from './components/auth/register'
import Home from './components/home/home'
import Single from './components/home/single'
import UpdateUser from './components/home/edit'
import AddUser from './components/home/add'
// import {useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {login} from './redux/actions/userActions'


import PrivateRoute from './PrivateRoute'
// import {useNavigate} from 'react-router-dom'
import './App.css';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>}/>
          <Route path="/:id" element={<PrivateRoute><Single /></PrivateRoute>}/>
          <Route path="/edit/:id" element={<PrivateRoute><UpdateUser /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><AddUser /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
