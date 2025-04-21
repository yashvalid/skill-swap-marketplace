import React, { useContext, useEffect, useRef } from 'react';
import { MessageInput } from '../components/MessageInput';
import { PhoneIcon, VideoIcon, InfoIcon } from 'lucide-react';
import { messageDataContext } from '../context/MessageContext';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

export function MessageThread({ conversation }) {
    const { messages, setMessages } = useContext(messageDataContext);
    const { userData } = useContext(UserDataContext);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/messages/get-messages`, {
                    params: { userToChatId: conversation.otherUser._id },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setMessages(response.data.messages);
            } catch (err) {
                console.error("Error fetching messages: ", err);
            }
        };

        if (conversation?.otherUser?._id) {
            fetchMessages();
        }
    }, [conversation, setMessages]);


    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);


    const handleSendMessage = async (text) => {
        try {
            const newMessage = {
                text,
                senderId: userData._id,
                receiverId: conversation.otherUser._id,
                timestamp: new Date().toISOString(),
            };

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/messages/send-message`, newMessage, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.status === 201) 
                setMessages((prevMessages) => [...prevMessages, response.data.messages]);
            
        } catch (err) {
            console.error("Error sending message: ", err);
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                    <img

                        alt=""
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">
                            {conversation.otherUser.fullname.firstname}{' '}
                            {conversation.otherUser.fullname.lastname}
                        </h3>
                        <p className="text-xs text-indigo-600">{conversation.requestedSkill}</p>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                        <PhoneIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                        <VideoIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                        <InfoIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.senderId === userData._id ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${message.senderId === userData._id
                                    ? 'bg-indigo-600 text-white rounded-br-none'
                                    : 'bg-white border border-gray-200 rounded-bl-none'
                                    }`}
                            >
                                <p className="text-sm">{message.text}</p>
                                <p
                                    className={`text-xs mt-1 text-right ${message.senderId === userData._id ? 'text-indigo-100' : 'text-gray-500'
                                        }`}
                                >
                                    {new Date(Date.parse(message.createdAt)).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}

                    <div ref={messagesEndRef} />
                </div>
            </div>
            <MessageInput handleSendMessage={handleSendMessage} />
        </div>
    );
}

