import React, { useEffect, useState } from 'react';
import { ConversationList } from '../components/ConversationList';
import { MessageThread } from '../components/MessageThread';
import axios from 'axios';

export function MessagesPage() {
    const [users, setUsers] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/skillswap/accepted-swaps`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.status === 201) {
                    console.log(response.data.allUsers);
                    setUsers(response.data.allUsers);
                    setSelectedConversation(response.data.allUsers[0]); 
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="flex h-[calc(100vh-64px)] bg-white pb-5">
            <ConversationList
                users={users}
                selectedId={selectedConversation?.otherUser?._id}
                setSelectedConversation={setSelectedConversation}
            />
            {selectedConversation && (
                <MessageThread conversation={selectedConversation} />
            )}
        </div>
    );
}