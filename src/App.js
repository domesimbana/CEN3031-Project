import './App.css';
import OpenInterface from './components/open-window'
import Work from './components/work-interface'
import { jwtDecode } from "jwt-decode";

import { useEffect, useState } from 'react';


function App() {

  const [user, setUser] = useState({});
  const [display, setDisplay] = useState(false);

  function handleCallbackResponse(res) {
    console.log("Enconded JWT ID token: " + res.credential);
    var userObject = jwtDecode(res.credential);
    console.log(userObject);
    setDisplay(true);
    setUser(userObject);
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "825357959721-817g515gj4tu01vmvgg5b234udnlsuid.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

  }, []);

  return (
    <>
      {!display &&
        <OpenInterface handleCallback={handleCallbackResponse} />
      }
      {user && display &&
        <Work userAcc={user} display={setDisplay} userSO={setUser} id="signInDiv" />
      }
    </>
  );
}

export default App;
