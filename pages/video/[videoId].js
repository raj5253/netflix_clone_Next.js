import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "@/styles/video.module.css";
import { getYoutubeVideoById } from "@/lib/videos";
import { useState, useEffect } from "react";

import classNames from "classnames";
import NavBar from "@/components/nav/navbar";
import Like from "@/components/icons/like-icon";
import DisLike from "@/components/icons/dislike-icon";

Modal.setAppElement("#__next");
export async function getStaticProps(context) {
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
  const router = useRouter();
  const videoId = router.query.videoId;

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  useEffect(() => {
    const prefetch = async () => {
      const response = await fetch(`/api/stats/?videoId=${videoId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.length > 0) {
        const favourited = data[0].favourited;
        if (favourited == 1) {
          setToggleLike(true);
        } else {
          setToggleDislike(true);
        }
      }
    };
    prefetch();
  }, []); //empyt depency, similar to ComponentDidMount, ie work only during first time component render.

  const runRatingServive = async (favourited) => {
    return await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId: videoId,
        favourited: favourited,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleToggleLike = async () => {
    const val = !toggleLike; //earlier false now true
    setToggleLike(val);
    setToggleDislike(toggleLike);

    const favourited = val ? 1 : 0;
    const response = await runRatingServive(favourited);
  };

  const handleToggleDislike = async () => {
    const val = !toggleDislike;
    setToggleDislike(val);
    setToggleLike(toggleDislike);

    const favourited = val ? 0 : 1;
    const response = await runRatingServive(favourited);
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen={true}
        contentLabel="Watch video"
        onRequestClose={() => {
          router.back();
        }}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <iframe
          id="player"
          type="text/html"
          className={styles.videoPlayer}
          width="100%"
          height="390"
          src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com&controls=0&rel=1&autoplay=0`}
          frameBorder="0"
        ></iframe>
        <div className={styles.likeDislikeBtnWrapper}>
          <div className="styles likeBtnWrapper">
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <DisLike selected={toggleDislike} />
            </div>
          </button>
        </div>

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

//useEffect has been chagned by react.
// useEffect should return a only a function.
//  to call a fetch( or any other fucntional code ) in useEffect use :
/**
 * useEffect(()=>{
 *  const fucn1 = ()=>{
 *    }
 *  func1();
 * }, [---]);
 */
