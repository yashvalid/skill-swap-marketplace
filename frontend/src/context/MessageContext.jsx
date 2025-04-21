import React, { createContext, useState } from 'react'

export const messageDataContext = createContext();

const MessageContext = ({children}) => {
    const [messages, setMessages] = useState([]);

  return (
    <messageDataContext.Provider value={{messages, setMessages}}>
        {children}
    </messageDataContext.Provider>
  )
}

export default MessageContext
