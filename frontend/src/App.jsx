import React, { useContext, useEffect } from "react"
import Header from "./components/Header"
import HowItWorks from "./pages/HowItWorks"
import { Route, Routes } from 'react-router-dom'
import Register from "./pages/Register"
import Login from "./pages/Login"
import MySkills from "./pages/MySkills"
import UserProtectedWrapper from "./components/UserProtectedWrapper"
import { MatchesPage } from "./pages/MatchesPage"
import { UsersPage } from "./pages/UsersPage"
import Home from "./pages/Home"
import { Start } from "./pages/Start"
import { UserProfilePage } from "./pages/UserProfilePage"
import { UserDataContext } from "./context/UserContext"
import { SocketDataContext } from "./context/SocketContext"
import { swapReqData } from './context/SwapReqContext'
import { MessagesPage } from "./pages/MessagesPage"
import { messageDataContext } from './context/MessageContext'

function App() {
  const { socket } = useContext(SocketDataContext);
  const { userData } = useContext(UserDataContext);
  const { setSwapRequests } = useContext(swapReqData);
  const { setMessages, messages } = useContext(messageDataContext)

  useEffect(() => {
    if (socket && userData) {
      socket.emit('join', { userId: userData._id });

      // const handleSwapRequest = (message) => {
      //   console.log("swap req", message)
      //   setSwapRequests(prevReq => {
      //     const updatedSwaps = [...prevReq, message];
      //     console.log("updated Swaps ", updatedSwaps);
      //     return updatedSwaps;
      //   })
      // };

      const handleNewMessage = (message) => {
        console.log("New message received:", message);
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, message];
          console.log("Updated messages:", updatedMessages);
          return updatedMessages;
        });
      };

      socket.on("swap-request", (req) =>{
        console.log("swapreq", req.swapReq);
        setSwapRequests((prevReq) => [...prevReq, req.swapReq]);
      });
      socket.on("new-message", handleNewMessage);

      return () => {
        socket.off("swap-request");
        socket.off("new-message", handleNewMessage);
      };
    }
  }, [userData, socket]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/myskills" element={
          <UserProtectedWrapper>
            <Header />
            <MySkills />
          </UserProtectedWrapper>
        } />
        <Route path="/requests" element={
          <UserProtectedWrapper>
            <Header />
            <MatchesPage />
          </UserProtectedWrapper>
        } />
        <Route path="/users" element={
          <UserProtectedWrapper>
            <Header />
            <UsersPage />
          </UserProtectedWrapper>
        } />
        <Route path="/profile" element={
          <UserProtectedWrapper>
            <Header />
            <UserProfilePage />
          </UserProtectedWrapper>
        } />
        <Route path="messages" element={
          <UserProtectedWrapper>
            <Header />
            <MessagesPage />
          </UserProtectedWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App
