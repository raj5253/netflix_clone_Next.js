import Card from "./card";

import styles from "./section-card.module.css";

const SectionCard = (props) => {
  const { title } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        <Card imgUrl="/static/theGuardians.jpg" size="large" id={0} />
        <Card imgUrl="/static/theGuardians.jpg" size="large" />
        <Card imgUrl="/static/theGuardians.jpg" size="large" />
        <Card imgUrl="/static/theGuardians.jpg" size="large" />
        <Card imgUrl="/static/theGuardians.jpg" size="large" />
        <Card imgUrl="/static/theGuardians.jpg" size="large" />
        <Card imgUrl="/static/theGuardians.jpg" size="large" />
        <Card imgUrl="/static/theGuardians.jpg" size="large" />
      </div>
    </section>
  );
};

export default SectionCard;
// section tag means the content inside it is grouped . whereas div doen't mean the inside dontents are grouped.

// firstcreated Card coponent, then create SectionCard component
