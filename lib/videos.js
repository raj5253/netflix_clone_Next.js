// intension is to extract only required dta from videos.json and send it to required components of index.sjon

import videoTestData from "../data/videos.json";
import { getMyListVideos, getWatchedVideos } from "./db/hasura";

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const BASE_URL = "youtube.googleapis.com/youtube/v3";

  const response = await fetch(
    `https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`,
    { method: "GET" }
  );
  return await response.json();
};

export const getCommonVideos = async (url) => {
  try {
    const isDev = process.env.DEVELOPMENT;
    const data = isDev === true ? videoTestData : await fetchVideos(url); // ***see end

    if (data?.error) {
      //when there is error in response by API, the error key is there in response, otherwise not.return empty array to prevent server crash.
      console.error("YouTube API error", data.error);
      return [];
    }

    return data?.items.map((item, idx) => {
      //json file is itself an object which contains items
      const id = item.id?.videoId || item.id;

      const snippet = item.snippet;
      return {
        title: snippet.title,
        // imgUrl: snippet.thumbnails.high.url,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id: id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.error("Something went wrong with video library", error);
    return [];
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&maxResults=25&q=${searchQuery}&type=video&videoType=any`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN`;
  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (videoId) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
};

export const getWatchItAgainVideos = async (userId, token) => {
  const videos = await getWatchedVideos(userId, token);
  return videos?.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    };
  });
};

export const getMyList = async (userId, token) => {
  const videos = await getMyListVideos(userId, token);
  return videos?.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    };
  });
};
// going to return array by mapping.

//whole json file itself is an object(and should be). we access the content present inside that object.
//also add googleapi in config of next.config.js

// response is the json_resopnse_data, which is a promise, fetched from YouTubeAPI.
// We are making fetch call , within our code to API. Easy for Raghav. He is master of Expressjs
// YOUTUBE_API_KEY : you get by creating a project on google youtube developers site. visit :https://developers.google.com/youtube/v3/getting-started

/**
 *   *** here
 *  when you set  "isDev" to true, then no ApI call is made.
 *  data stored in  data/vdeio.json is used.
 *  And below in same code you can see, we go for the first item of the returned array.
 *  so, defineltely when isDev ===true, then we return the mapped array of video-contents
 *
 * and this array is used by getStaticProps(), which selects only the first item.
 * Hence, if isDev istrue, you see the video-contents of first element of items arry of video.json.
 *      and for iframe, we make direct to requested video-id, so there atcul video is played corressponding to that videoId.
 *
 * I know its confusing, aur isko itna dhyan mat do.
 */
