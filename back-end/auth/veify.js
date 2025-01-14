import jwt from "jsonwebtoken"

export default verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET)
