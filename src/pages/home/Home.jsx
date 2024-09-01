import Header from "../../components/Header";
import LandingPage from "../../components/LandingPage";
import ProjectSection from "../../components/ProjectSection";
import SkillsSection from "../../components/SkillsSection";
import Footer from "../../components/Footer";
import ShowCase from "../../components/ShowCase";

const Home = () => {
  
  return (
    <div className="flex flex-col items-center w-screen min-w-screen overflow-x-hidden">
      <Header />
      <main className="w-full">
        <LandingPage />
        <ProjectSection />
        <SkillsSection />
        <ShowCase />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
