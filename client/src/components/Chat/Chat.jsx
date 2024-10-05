import React, { useContext, useEffect, useRef, useState } from 'react';
import "./chat.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../Context/AuthContext';
import apiRequest from '../lib/apiRequest';
import { format } from "timeago.js";
import { SocketContext } from '../../Context/Socket';
import { useNotificationStore } from '../lib/notificationStore';

const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  
  const messageEndRef = useRef();
  const decrease = useNotificationStore((state) => state.decrease);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}` 
        }
      });
      if (res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const text = formData.get("text");
  
    if (!text) return; // Early return if no text
  
    try {
      const res = await apiRequest.post("/messages/" + chat.id, { text }, {
        headers: {
          Authorization: `Bearer ${currentUser.accessToken}` 
        }
      });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", { // Ensure this matches with server
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("/chats/read/" + chat.id, {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}` 
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
  
    if (chat && socket) {
      socket.on("getMessage", (data) => { // Ensure this matches with server
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className='messages'>
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div className="message" key={c.id}
            style={{
              backgroundColor: c.seenBy.includes(currentUser.id) || chat?.id === c.id
                ? "white"
                : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img 
              src={c.receiver.avatar || "/img/avatar.jpg"} 
              alt=''
            />
            <span><b>{c.receiver.username}</b></span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="info">
              <div className="user">
                <img 
                  src={chat.receiver.avatar || "/img/avatar.jpg"} 
                  alt=''
                />
                <span><b>{chat.receiver.username}</b></span>
              </div>
              <FontAwesomeIcon icon={faXmark} onClick={() => setChat(null)} />
            </div>
          </div>
          <div className="center">
            {chat.messages.map(message => (
              <div className="chatMessage" key={message.id}
                style={{
                  alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                  textAlign: message.userId === currentUser.id ? "right" : "left",
                }}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="bottom">
              <textarea name='text' placeholder="Type a message..."></textarea>
              <button>Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
