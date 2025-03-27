import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { animation } from "../../utils/Animations";
import HeroImage from "../../assets/images/Frame 427319350.png";

const Hero = () => {
  return (
    <motion.section
      variants={animation}
      initial="initial"
      whileInView="animate"
      transition={{ duration: 1 }}
      className="hero"
    >
      <div className="overlay">
        <h2 className="hero-heading">
          Decorate your Space with <br /> Us
        </h2>
        <ul className="overlay-list">
          <li>Order</li>
          <li>Door Bell</li>
          <li>Space Solved</li>
        </ul>
        <button className="overlay-btn">
          Buy Now{" "}
          <Icon
            icon="iconamoon:arrow-top-right-1-light"
            width="24"
            height="24"
            style={{ color: "#284551" }}
            className="arrow-icon"
          />
        </button>
      </div>
      <img src={HeroImage} alt="" />
    </motion.section>
  );
};

export default Hero;
