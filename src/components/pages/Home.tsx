import Category from "../home/Category";
import Hero from "../home/Hero";
import HomeSection from "../home/HomeSection";
import ProjectSection from "../home/ProjectSection";
import Subscription from "../home/Subscription";

const Home = () => {
  return (
    <section>
      <Hero />
      <Category />
      <HomeSection />
      <ProjectSection />
      <Subscription />
    </section>
  );
};

export default Home;
