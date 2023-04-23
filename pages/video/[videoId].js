import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "@/styles/video.module.css";
import { getYoutubeVideoById } from "@/lib/videos";

import classNames from "classnames";
import NavBar from "@/components/nav/navbar";

Modal.setAppElement("#__next");
export async function getStaticProps(context) {
  //data fetch from API
  // const video = {
  //   title: "Hi heros",
  //   publishTime: "2021-01-01",
  //   description:
  //     "A group of four legends who protect the earth from cyber rule",
  //   channelTitle: "Vega daimond movies",
  //   viewCount: 9999,
  // };

  const videoId = context.params.videoId;
  const videoArray = await getYoutubeVideoById(videoId); //since this page is generated for each of the  videos (either the banner one , or those present in section card).
  // This getYoutubeVideoById(videoId) will be called by each of the video when user user opens the page for it.
  // data send to section card -> from that only videoId is sent in url, which display this [videoId].js page. And to display content related that particular video, getYoutubeVideoById(videoId) is called.

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["mKXOdCRK3Zg", "7tzTQnXuZKk", "5oH9Nr3bKfw"];

  // Get the paths we want to pre-render based on posts
  const paths = listOfVideos.map((videoId) => ({
    params: { videoId }, //return items should have same name as required in URL
  }));

  return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
  // {video} is taken from getStaticProps called above, each time this page renders
  const router = useRouter();
  console.log("router -by [video].js", router);
  console.log("video as arg in [VideoId].js :", video);

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  return (
    <div className={styles.container}>
      <NavBar />
      Video page {router.query.videoId}
      <Modal
        isOpen={true}
        contentLabel="Watch video"
        onRequestClose={() => {
          router.back();
        }}
        overlayClassName={styles.overlay}
        className={styles.modal}
        // onAfterOpen={afterOpenModal}
        // style={customStyles}
      >
        <iframe
          id="player"
          type="text/html"
          className={styles.videoPlayer}
          width="100%"
          height="390"
          src={`http://www.youtube.com/embed/${router.query.videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=1&autoplay=0`}
          frameBorder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={classNames(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast:</span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={classNames(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>viewcount :</span>
                <span className={styles.viewCount}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;

//Remember :  Next js is based on directory based routing. so everthing present in "pages" directory is accessible via url.
// file name is [videoId].js, bc square brackets specify that this page can be accessed by a dynamic name.
