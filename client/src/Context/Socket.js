import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { currentUser } = useContext(AuthContext);
    
    useEffect(() => {
        const newSocket = io("http://localhost:4000"||"https://realestate-1-gnii.onrender.com");
        setSocket(newSocket);

        // Cleanup function to disconnect the socket when the component unmounts
        return () => newSocket.disconnect();
    }, []);

    useEffect(() => {
        if (currentUser && socket) {
            socket.emit("new user", currentUser.id);
        }
    }, [currentUser, socket]); // Updated dependency array

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
