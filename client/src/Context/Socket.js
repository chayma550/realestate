import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { currentUser } = useContext(AuthContext);
    
    useEffect(() => {
        // Define socket URL based on environment
        const socketURL = process.env.REACT_APP_SOCKET_URL || "http://localhost:4000";
        const newSocket = io(socketURL);
        setSocket(newSocket);

        // Cleanup function to disconnect the socket when the component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (currentUser && socket) {
            socket.emit("new user", currentUser.id);
        }
    }, [currentUser, socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
