import { useRouter } from "next/router";
import Modal from "react-modal";
import styles from "@/styles/video.module.css";

import classNames from "classnames";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();
  console.log("router -by [video].js", router);

  const video = {
    title: "Hi heros",
    publishTime: "2021-01-01",
    description:
      "A group of four legends who protect the earth from cyber rule",
    channelTitle: "Vega daimond movies",
    viewCount: 9999,
  };

  const { title, publishTime, description, channelTitle, viewCount } = video;

  return (
    <div className={styles.container}>
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
          frameborder="0"
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
