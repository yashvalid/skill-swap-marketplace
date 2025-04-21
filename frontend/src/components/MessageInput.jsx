import React, { useState } from 'react';

export function MessageInput({ handleSendMessage }) {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            handleSendMessage(text);
            setText(''); 
        }
    };

    return (
        <div className="flex items-center mt-4">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSend();
                    }
                }}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
            />
            <button
                onClick={handleSend}
                className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm"
            >
                Send
            </button>
        </div>
    );
}