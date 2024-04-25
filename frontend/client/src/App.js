import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import LogIn from "./pages/Login";
import Homepage from './pages/Home';
import PdfComp from "./pages/Document";
import Navbar from "./pages/Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [userData, setUserData] = useState(null);
  const [allImage, setAllImage] = useState(null);

  const navigate = useNavigate();

  // Function to fetch user data from the server
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/login/success", { withCredentials: true });
      console.log("response", response);
      if (response.data.user) {
        setUserData(response.data.user);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.log("There is something wrong");
    }
  }

  // Fetch user data when component mounts
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Routes>
        {/* Redirect to appropriate route based on user login status */}
        <Route path='/' element={userData ? <Navigate to='/home' /> : <Navigate to='/login' />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/document' element={<PdfComp />} />
        {/* Additional routes */}
        {/* <Route path='/*' element={<Error />} /> */}
        {/* <Route path='/' element={<Homepage userAcc={user} userSO={setUser} id="signInDiv" />} />
          <Route path='/' element={<Homepage userAcc={user} userSO={setUser} id="signInDiv" />} /> */}
        {/* <Route path='/login' element={user ? <Navigate to='/' /> : <OpenInterface handleCallback={handleCallbackResponse} />} /> */}
        {/* <Route path='/' element={<PdfComp />} /> */}
      </Routes>
    </>
  );
}

export default App;
