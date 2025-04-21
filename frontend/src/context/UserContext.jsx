import React, { useState } from 'react'
import { createContext } from 'react'

export const UserDataContext = createContext();

const UserContext = ({children}) => {
    const [userData, setUserData] = useState({
        fullname : {
            firstname : "",
            lastname : ""
        },
        email : "",
        password : "",
        userId : "",
    });
  return (
    <UserDataContext.Provider value={{userData, setUserData}}>
        {children}
    </UserDataContext.Provider>
  )
}

export default UserContext
