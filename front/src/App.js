import './App.css';
import { BrowserRouter as Main,
Route,
Routes,
Navigate } from 'react-router-dom';
import Home from "./pages/home/home";
import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Register from './pages/register/register';
import Create from './components/create/create';
import Messenger from './pages/messenger/messenger';

function App() {

  const user = useContext(AuthContext);

  return (
    <>
      <Main>
        <Routes>
          <Route exact path='/' element={user? <Home/>:<Login/>}/>
          <Route  path='/login' element={<Login/>}/>
          <Route  path='/register' element={<Register/>}/>
          <Route  path='/messenger' element={!user ? <Navigate to="/"/> : <Messenger/>}/>
          <Route path='/profile/:username' element={<Profile/>}/>
          <Route path='/create' element={<Create/>}/>
        </Routes>
      </Main>
    </>
  );
}

export default App;

