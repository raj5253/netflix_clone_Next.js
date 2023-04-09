// intension is to extract only required dta from videos.json and send it to required components of index.sjon

import videoData from "../data/videos.json";

export const getVideos = () => {
  return videoData.items.map((item, idx) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item?.id?.videoId,
    };
  });
};

// going to return array by mapping.
//also add googleapi in config of next.config.js
