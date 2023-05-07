import Head from "next/head";
import SectionCard from "@/components/card/section-cards";
import NavBar from "../../components/nav/navbar";
import styles from "../../styles/Mylist.module.css";
import { getMyList } from "@/lib/videos";
import useRedirectUser from "@/utils/redirectUsers";
// Static site rendering -not work,
// incremntal site rendering - not work
// Server side  rendering - use this

export async function getServerSideProps(context) {
  const { userId, token } = await useRedirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const videos = await getMyList(userId, token);

  return {
    props: {
      myListVideos: videos,
    },
  };
}
const Mylist = ({ myListVideos }) => {
  return (
    <div>
      <Head>
        <title>MyList</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCard
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};
export default Mylist;
