import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import "../../assets/styles/general.css";
import { animation } from "../../utils/Animations";

interface HeadingProps {
  title: string;
  btnTitle?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, btnTitle }) => {
  return (
    <motion.section
      variants={animation}
      initial="initial"
      whileInView="animate"
      transition={{ duration: 1 }}
      className="heading-section"
    >
      <div className="heading-section-box">
        <h3>{title}</h3>
        <button>
          {btnTitle}{" "}
          <Icon
            icon="material-symbols:chevron-right"
            width="24"
            height="24"
            style={{ color: "#425462" }}
          />
        </button>
      </div>
    </motion.section>
  );
};

export default Heading;
