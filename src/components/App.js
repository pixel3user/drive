import { AuthProvider } from '../contexts/authContext';
import './App.css';
import Signup from './authentication/signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from './authentication/profile';
import Login from './authentication/login';
import PrivateRoute from './authentication/privateRoute';
import ForgotPassword from './authentication/forgotPassword';
import UpdateProfile from './authentication/updateProfile';
import Dashboard from './google-drive/dashboard';

function App() {
  return (
        <AuthProvider>
          <Router>
              <Routes>

                {/* Profile routes */}
                <Route exact path='/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route exact path='/user' element={<PrivateRoute><Profile /></PrivateRoute>} />        
                <Route path='/update-profile' element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />      
                <Route exact path='/folder/:folderId' element={<PrivateRoute><Dashboard /></PrivateRoute>} />

                {/* Auth routes */}
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />      
              </Routes>
          </Router>
        </AuthProvider>
  );
}

export default App;
