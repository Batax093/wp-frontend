import Header from "../../components/Header";
import LandingPage from "../../components/LandingPage";
import ProjectSection from "../../components/ProjectSection";
import SkillsSection from "../../components/SkillsSection";
import Footer from "../../components/Footer";
import ShowCase from "../../components/ShowCase";
import Journey from "../../components/Journey";

const Home = () => {
  
  return (
    <div className="flex flex-col items-center w-screen min-w-screen overflow-x-hidden">
      <Header />
      <main className="flex flex-col w-full">
        <LandingPage />
        <Journey />
        <ProjectSection />
        <SkillsSection />
        <ShowCase />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
