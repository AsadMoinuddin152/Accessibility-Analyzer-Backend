const jwt = require("jsonwebtoken");

const requrieSignIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using jsonwebtoken
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure JWT_SECRET is in your .env
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT auth error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = requrieSignIn;
