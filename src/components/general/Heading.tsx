import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import "../../assets/styles/general.css";
import { animation } from "../../utils/Animations";
import { useNavigate } from "react-router-dom";

interface HeadingProps {
  title: string;
  btnTitle?: string;
  path: "sale" | "category";
}

const Heading: React.FC<HeadingProps> = ({ title, btnTitle, path}) => {
  const navigate = useNavigate();

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
        <button onClick={path === "sale" ? ()=>navigate("/products/sale") : ()=>navigate("/products?category=Chair")}>
          {btnTitle}
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
