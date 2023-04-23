import Link from "next/link";
import Card from "./card";

import styles from "./section-card.module.css";

const SectionCard = (props) => {
  const { title, videos = [], size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, id) => {
          // console.log("video id", video.id);

          return (
            <Link href={`/video/${video.id}`} key={video.id}>
              <Card id={id} size={size} imgUrl={video["imgUrl"]} />;
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCard;
// section tag means the content inside it is grouped . whereas div doen't mean the inside dontents are grouped.

// firstcreated Card coponent, then create SectionCard component

// you get array of videos in props of SectioCard. From this array you map(I did it✌️) the elements to create <Card/> for each of them.
