import { useState } from "react";
import styles from "./card.module.css";
import Image from "next/image";
import { motion } from "framer-motion"; //after error handling
const classname = require("classnames");

const Card = (props) => {
  const {
    imgUrl = "https://images.unsplash.com/photo-1534961165765-5c9795af911b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=407&q=80",
    size = medium,
    id,
    shouldScale = true,
  } = props; //destructuring //default value to medium

  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImgSrc(
      "https://images.unsplash.com/photo-1534961165765-5c9795af911b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=407&q=80"
    );
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 }; //first card should expand only in y direction
  const shouldHover = shouldScale && { whileHover: { ...scale } };
  return (
    <div className={styles.container}>
      <motion.div
        className={classname(classMap[size], styles.imgMotionWrapper)}
        // whileHover={{ ...scale }}
        {...shouldHover}
      >
        <Image
          src={imgSrc}
          alt="image"
          fill
          className={styles.cardImg}
          onError={handleOnError}
          sizes="100px 100px" /*width and height is for size of image to display. sizes if for which image size to dwonload from net. */
        />
      </motion.div>
    </div> //earlier it was just div.
  );
};

export default Card;

// NOTE : <Image ...... > does not contain width-height,  then width-height from parent element should be taken, by adding "fill" property to <Image 'fill'>
//  for this ensure the parent element of the iamge has "position: relative" .add this in card.moudle.css

// when th provided image does not wor , you handle the error by React way( assing value by states)
// onError={handleOnError} ; onError is predfined similar to onClick in React

// //first card should expand only in y direction
// how to now its the first card ? . pass id=0 in the first <Card /> in SectionCard
