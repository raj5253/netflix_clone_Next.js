import { isNewUser, createNewUser } from "@/lib/db/hasura";
import { magicAdmin } from "../../lib/magic";
var jwt = require("jsonwebtoken");

export default async function login(req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization; //postman is sending post req here
      const didToken = auth ? auth.substr(7) : "";
      // console.log(auth);
      console.log({ didToken });
      // invoke magic

      const metadata = await magicAdmin.users.getMetadataByToken(didToken);
      console.log({ metadata });

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
      console.log({ token });

      // CHECK IF USER EXISTS
      const isNewUserQuery = await isNewUser(token, metadata.issuer); //earlier we were copy pasting thetokens, now passing the tokens by passing tokens as args of fucn encapsulating queryies
      if (isNewUserQuery) {
        //create a new user
        const createNewUserMutation = await createNewUser(token, metadata);
        console.log({ createNewUserMutation });
        res.send({ done: true, msg: "is a new user" }); //response to postman
      } else {
        res.send({ done: true, msg: "is not a new user" }); //response to postman
      }
    } catch (error) {
      console.log("something went wrong while logging you in ::" + error);
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}

//you can handle this in POSTMAN.
//sen post request to  "localhost:3000/api/login"
//  also in auth you send token : Bearer token ( bc as of now, postman is working in place of hasura, and hasura send bearer token )

// hasura needs the value of isser , which you get by magic-auth/admin : https://magic.link/docs/auth/api-reference/server-side-sdks/node

// Could not verify JWT: JWSError JWSInvalidSignature =>problem si in secret key
