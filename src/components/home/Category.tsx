import { useState } from "react";
import "../../assets/styles/category.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { animation } from "../../utils/Animations";
import { useLocation } from "react-router-dom";

const Category = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const location = useLocation();
  const path = location.pathname;

  const changeActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <motion.section
      variants={animation}
      initial="initial"
      whileInView="animate"
      transition={{ duration: 1 }}
      className="category-section"
      style={{ margin: path !== "/" ? "5px 0px" : "24px 0px" }}
    >
      <div className="category-section-box">
        <ul className="category-list">
          {["Chair", "Table", "Sofa", "Dining", "Bed", "Interior"].map(
            (tab, index) => (
              <li key={index} className={`${activeTab === tab && "active"}`}>
                <a
                  onClick={() => changeActiveTab(tab)}
                  className={`category-link`}
                >
                  {tab}
                </a>
              </li>
            )
          )}
        </ul>
        <div className="dropdown">
          Category
          <Icon
            icon="mdi:chevron-down"
            width="24"
            height="24"
            style={{ color: "#425462" }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default Category;
