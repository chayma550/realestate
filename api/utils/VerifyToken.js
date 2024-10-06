import Jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    // Check if the token is present
    if (!token) {
        return res.status(401).json({ message: "You are not authenticated!" });
    }

    // Verify the token
    Jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid!" }); // Return and stop further processing
        }
        
        // Check if the payload is valid
        if (!payload || !payload.id) {
            return res.status(403).json({ message: "Invalid token payload!" });
        }

        req.userId = payload.id; // Set userId from payload
        next(); // Continue to the next middleware or route handler
    });
};
