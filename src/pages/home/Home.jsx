import Header from "../../components/Header";
import LandingPage from "../../components/LandingPage";
import ProjectSection from "../../components/ProjectSection";
import Footer from "../../components/Footer";
import ShowCase from "../../components/ShowCase";
import Journey from "../../components/Journey";

const Home = () => {
  
  return (
    <div className="flex flex-col items-center w-screen min-w-screen">
      <Header />
      <main className="flex flex-col w-full space-y-16">
        <LandingPage />
        <Journey />
        <ProjectSection />
        <ShowCase />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
