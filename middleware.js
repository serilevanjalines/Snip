const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        console.log("JWT Secret during verify:", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
    console.error("JWT Verify Error:", err);
    return res.status(403).json({ error: "Invalid token" });
}
}

module.exports = authenticateToken;