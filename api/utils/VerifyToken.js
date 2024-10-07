import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken; 
  if (!accessToken) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "accessToken is not Valid!" });
    
    req.userId = payload.id; // Attach user ID to the request object for later use

    next(); // Call the next middleware or route handler
  });
};
