import axios from 'axios';
import React, { createContext, use, useContext, useEffect, useState } from 'react'
import { authDataContext } from './authContext';


export const userDataContext = createContext()
function UserContext({ children }) {
  let [userData, setUserData] = useState("");
  let { serverURL } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      let result = await axios.post(
        serverURL + "/api/user/getcurrentuser",
        {},
        { withCredentials: true }
      );
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  let value = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext