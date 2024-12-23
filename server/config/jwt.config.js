import jwt from "jsonwebtoken";

const secret = "your-secret-key"; // Replace with your actual secret key

    export const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Attach decoded payload to the request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    };



