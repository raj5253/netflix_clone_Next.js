import { isNewUser, createNewUser } from "@/lib/db/hasura";
import { magicAdmin } from "../../lib/magic";
var jwt = require("jsonwebtoken");
import { setTokenCookie } from "@/lib/cookies";

export default async function login(req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization; //pages/login.js is sending post request//earlier postman was for this.
      const didToken = auth ? auth.substr(7) : "";

      // invoke magic server-side(admin)
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);

      //   create jwt token
      const token = jwt.sign(
        {
          ...metadata,

          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metadata.issuer}`,
          },
        },
        process.env.JWT_SECRET
      );

      // CHECK IF USER EXISTS
      const isNewUserQuery = await isNewUser(token, metadata.issuer); //earlier we were copy pasting thetokens, now passing the tokens by passing tokens as args of fucn encapsulating queryies

      isNewUserQuery && (await createNewUser(token, metadata));
      setTokenCookie(token, res);
      res.send({ done: true });
    } catch (error) {
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}

//you can handle this in POSTMAN.
//sen post request to  "localhost:3000/api/login"
//  also in auth you send token : Bearer token ( bc as of now, postman is working in place of hasura, and hasura send bearer token )

// hasura needs the value of issuer , which you get by magic-auth/admin : https://magic.link/docs/auth/api-reference/server-side-sdks/node

// Could not verify JWT: JWSError JWSInvalidSignature =>problem si in secret key

//earlier postman was used during development phase, but now since testing was completed, pages/login.js has the duty to invoke this api when user try to login.
