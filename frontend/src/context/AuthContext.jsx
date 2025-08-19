import React, { createContext } from 'react'
export const authDataContext = createContext();
let serverURL = "http://localhost:8000"
let value = {
  serverURL
}


function AuthContext({children}) {
  return (
    <authDataContext.Provider value={value}>
    {children}
    </authDataContext.Provider>
  )
}

export default AuthContext