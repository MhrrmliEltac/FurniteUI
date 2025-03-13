import axios from "axios";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import "../../assets/styles/project.css";
import { fadeInAnimationVariants } from "../utils/fadeInAnimationVariant";
import { animation } from "../utils/Animations";

interface ProjectDataType {
  name: string;
  description: string;
  year: number;
}

const ProjectSection = () => {
  const [projectData, setProjectData] = useState<ProjectDataType[] | null>(
    null
  );

  const getAllProject = async () => {
    const response = await axios.get(
      "https://furniture-server-theta.vercel.app/api/project/project",
      { withCredentials: true }
    );
    setProjectData(response.data);
  };

  useEffect(() => {
    getAllProject();
  }, []);

  return (
    <motion.section
      variants={animation}
      initial="initial"
      whileInView="animate"
      transition={{ duration: 1 }}
      className="project-section"
    >
      <div className="projects">
        <div className="project-header">
          <h2>Our Projects</h2>
        </div>
        <div>
          {projectData &&
            projectData.length > 0 &&
            projectData?.map((project: ProjectDataType, index: number) => (
              <motion.ul
                className="project-list"
                initial="initial"
                variants={fadeInAnimationVariants}
                transition={{ delay: 0.2 * index }}
                key={index}
                whileInView="animate"
                viewport={{ once: true }}
                custom={index}
              >
                <li>{project.name}</li>
                <li>{project.description}</li>
                <li>{project.year}</li>
                <li>
                  <Icon
                    icon="iconamoon:arrow-top-right-1-light"
                    width="20"
                    height="20"
                    style={{ color: "#162C36" }}
                    className="arrow-icon"
                  />
                </li>
              </motion.ul>
            ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectSection;
