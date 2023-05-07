import Jwt from "jsonwebtoken";

export async function verifyToken(token) {
  if (token) {
    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken?.issuer;
    return userId;
  }
  return null;
}
