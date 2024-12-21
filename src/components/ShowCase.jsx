import { Parallax } from "react-scroll-parallax";

const ShowCase = () => {

  return (
    <div className="w-full flex flex-col justify-between items-center py-24 md:py-36 lg:py-48">
      <div className="flex flex-col lg:flex-row items-between justify-around w-full max-w-6xl h-full space-y-12 lg:space-y-0 lg:space-x-8">
        {/* Image with fade-in effect */}
        <Parallax
          translateY={["-20vh", "5vh"]}
          opacity={[-2, 4]}
          className="flex justify-center items-center w-full lg:w-full z-10">
          <div className="flex justify-center w-full lg:w-full">
            <img
              src="DSC04673.JPG"
              alt="Photo"
              className="max-w-full h-full rounded-lg shadow-xl"
            />
          </div>
        </Parallax>

        {/* Text and Button Section */}
        <Parallax
          translateX={["0vw", "0vw"]}
          translateY={["0vh", "0vh"]}
          opacity={[-2, 7]}
          className="flex flex-col justify-center items-center w-full lg:w-1/2 space-y-6 lg:space-y-12">
          <div className="intro text-center text-md md:text-xl lg:text-2xl text-black leading-relaxed space-y-4 px-4 lg:px-0 z-0">
            <p className="text-xl text-center md:text-2xl lg:text-3xl md:text-start xl:text-left font-normal">
              Hi, I’m <span className="text-bluePastel">Fredrik Sahalatua Pakpahan</span>, a student who’s passionate about both backend and frontend development. I love exploring the full stack and building
              seamless, user-friendly applications. This website is my portfolio – a place where you can discover my projects, learn about my journey,
              and connect with me.
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href="../../public/file/Resume-Fredrik.pdf"
              download="Resume.pdf"
              className="mt-2 text-black py-4 px-8 text-lg hover:shadow-2xl transition-shadow duration-300 rounded-full"
              >
              Download My CV
            </a>
          </div>
        </Parallax>
      </div>
    </div>
  );
};

export default ShowCase;
