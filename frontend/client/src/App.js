
import { Routes, Route, Navigate  } from "react-router-dom";
import { useEffect, useState } from 'react';
import LogIn from "./pages/Login";
import Homepage from './pages/Home';
import PdfComp from "./pages/Document";
import Navbar from "./pages/Navbar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function App() {
  const [userData, setUserData] = useState(null);
  const [allImage,setAllImage]=useState(null);

  const navigate = useNavigate();

  //THERE IS AN ERROR HERE: IF USER REFRESHES INSTEAD OF LOGING IN FROM THE START IT WONT BE ABLE TO GET A USER
  const getUser = async () => {
    try {
        const response = await axios.get("http://localhost:4000/login/success", { withCredentials: true });
        console.log("response",response)
        if (response.data.user) {
          setUserData(response.data.user);
        } else {
          setUserData(null);
        }
    } catch (error) {
      console.log("There is something wrong");
    }
}


useEffect(() => {
  getUser()
}, [])


  return (
      <>
        <Routes>
        <Route path='/' element={userData ? <Navigate to='/home' /> : <Navigate to='/login' />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/home' element={<Homepage />} />

          {/* <Route path='/*' element={<Error />} /> */}
          {/* <Route path='/' element={<Homepage userAcc={user} userSO={setUser} id="signInDiv"  />} />
          <Route path='/' element={<Homepage userAcc={user} userSO={setUser} id="signInDiv"  />} /> */}  
          {/* <Route path='/login' element={user ? <Navigate to='/' /> : <OpenInterface handleCallback={handleCallbackResponse} />} /> */}
          {/* <Route path='/' element={<PdfComp />} /> */}
        </Routes>
      </>

    // <>
    //   {!display &&
    //     <OpenInterface handleCallback={handleCallbackResponse} />
    //   }
    //   {user && display &&
    //     <Work userAcc={user} display={setDisplay} userSO={setUser} id="signInDiv" />
    //   }
    // </>
  );
}

export default App;
