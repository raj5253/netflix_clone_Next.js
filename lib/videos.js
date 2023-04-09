// intension is to extract only required dta from videos.json and send it to required components of index.sjon

// import videoData from "../data/videos.json";  // fetch() replaced it

export const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    const BASE_URL = "youtube.googleapis.com/youtube/v3";

    const response = await fetch(
      `https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`,
      { method: "GET" }
    );

    const data = await response.json();

    if (data?.error) {
      //when there is error in response by API, the error key is there in response, otherwise not.return empty array to prevent server crash.
      console.error("YOutube API error", data.error);
      return [];
    }

    //   return videoData.items.map((item, idx) => {
    return data?.items.map((item, idx) => {
      const id = item.id?.videoId || item.id;
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id: id,
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

export const getPopularVideos = (searchQuery) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN`;
  return getCommonVideos(URL);
};
// going to return array by mapping.

//whole json file itself is an object(and should be). we access the content present inside that object.
//also add googleapi in config of next.config.js

// response is the json_resopnse_data, which is a promise, fetched from YouTubeAPI.
// We are making fetch call , within our code to API. Easy for Raghav. He is master of Expressjs
// YOUTUBE_API_KEY : you get by creating a project on google youtube developers site. visit :https://developers.google.com/youtube/v3/getting-started
