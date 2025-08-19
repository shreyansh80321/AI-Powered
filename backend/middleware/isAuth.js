import jwt from 'jsonwebtoken';
const isAuth = async (req, res, next) => { 
  try {
    let { token } = req.cookies
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({ message: "user does not have a valid token" });
    }
    req.userId = verifyToken.userId
    next();
  } catch (error) {
        console.log("isAuth error:", error.message);
        return res
          .status(500)
          .json({ message: `isAuth error: ${error.message}` });
    
  }
}

export default isAuth