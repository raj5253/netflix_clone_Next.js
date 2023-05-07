import { removeTokenCookie } from "@/lib/cookies";
import { magicAdmin } from "@/lib/magic";
import { verifyToken } from "@/lib/utils";

export default async function logout(req, res) {
  try {
    // check if user is loged in
    if (!req.cookies.token) {
      return res.status(401).json({ message: "Use is not logged in" });
    }

    const token = req.cookies.token;
    const userId = verifyToken(token);

    //delete the cookie
    removeTokenCookie(res);

    //remove user from magic
    try {
      await magicAdmin.users.logoutByIssuer(userId); //userId is the issuer
    } catch (error) {
      console.log("User's session with Magic already expired");
      console.error("Error occurred while logging out magic user", error);
    }

    // redirect the user to login page
    res.writeHead(302, { Location: "/login" });
    res.end();
  } catch (error) {
    console.log({ error });
    res.status(401).json({ message: "user is not logged in" });
    console.error("error in logout ", error);
  }
}
