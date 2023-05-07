// import Jwt from "jsonwebtoken";
import { findVideoIdByUser, insertStats, updateStats } from "@/lib/db/hasura";
import { verifyToken } from "@/lib/utils";

export default async function stats(req, res) {
  try {
    const token = req.cookies.token; //req contains cookies //whe using postman add Authorization->Type: Bearer Token-> value: jwtToken. in senario, req from from website will sure contain cookies(user must be logen in)
    if (!token) {
      res.status(403).send({ msg: "no token" });
    } else {
      const inputParams = req.method === "POST" ? req.body : req.query;
      const { videoId } = inputParams; //postman will pass these in body-raw-json
      if (videoId) {
        const userId = await verifyToken(token);

        const findVideo = await findVideoIdByUser(token, userId, videoId);
        const doesStatsExist = findVideo?.length > 0;

        if (req.method === "POST") {
          const { favourited, watched = true } = req.body; //same name used so easily deconstructed
          if (doesStatsExist) {
            // update it
            const response = await updateStats(token, {
              favourited: favourited,
              userId: userId,
              watched: watched,
              videoId: videoId,
            });
            // res.send({ msg: "updated stats", response });
            res.send({ data: response });
          } else {
            // add it
            const response = await insertStats(token, {
              favourited: favourited,
              userId: userId,
              videoId: videoId,
              watched: watched, //earlier for first time,let was false, but logic changed
            });
            // res.send({msg: "need insertion",decoded: decodedToken,response,doesStatsExist});
            res.send({ data: response });
          }
        } else {
          //GET
          if (videoId) {
            const findVideo = await findVideoIdByUser(token, userId, videoId);
            const doesStatsExist = findVideo?.length > 0;

            if (doesStatsExist) {
              res.send(findVideo);
            } else {
              res.status(404);
              res.send({ user: null, msg: "Video not found" });
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Error occured /stats", error);
    res.status(500).send({ done: false, error: error?.message });
  }
}

// const userId = "did:ethr:0x46A78b352F31F2966Fb08a6C483a5A3C11a276B5";
// console.log({ decoded });
// const { videoId, favourited, watched = true } = req.body; //postman will pass these in body-raw-json

// during development phase, postman send post req to this /api/stats

// const videoId = req.query.videoId; //postman will pass videoId key in params of req. for trial
