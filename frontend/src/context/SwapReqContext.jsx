import React, { createContext, useEffect, useState } from 'react'

export const swapReqData = createContext();

const SwapReqContext = ({children}) => {
 
  const [swapRequests , setSwapRequests] = useState([])

  return (
    <swapReqData.Provider value={{ swapRequests, setSwapRequests}}>
        {children}
    </swapReqData.Provider>
  )
}

export default SwapReqContext
