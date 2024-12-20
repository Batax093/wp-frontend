import { ParallaxProvider, Parallax } from "react-scroll-parallax";

const LandingPage = () => {
  return (
    <ParallaxProvider>
      <div id="landingpage" className="w-full min-h-screen relative text-start flex items-center justify-center">
        <div className="container flex flex-col md:flex-row items-center justify-around gap-10 px-5">
          <Parallax speed={-15}>
            <div className="flex flex-col w-[100%] items-start text-center text-5xl text-black">
              <p>
                From Scratch to <span className="text-bluePastel">Production</span>
              </p>
            </div>
          </Parallax>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default LandingPage;
