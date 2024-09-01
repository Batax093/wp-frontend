import { useEffect, useState } from "react";
import { Parallax } from "react-scroll-parallax";

const LandingPage = () => {
  const [nameIndex, setNameIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const names = ["STUDENT", "BACKEND", "FRONTEND"];
  const text = ["DEVELOPER", "WHO LOVES", "TO LEARN"];

  useEffect(() => {
    const interval = setInterval(() => {
      setNameIndex((prevIndex) => (prevIndex + 1) % names.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [names.length]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateColor = () => {
    const startScroll = 100;
    const endScroll = 800;
    const maxScroll = endScroll - startScroll;

    if (scrollPosition < startScroll) {
      return "black";
    }

    let scrollPercentage = Math.min((scrollPosition - startScroll) / maxScroll, 1);
    let colorValue = Math.floor(234 + 20 * scrollPercentage);
    let colorValueB = Math.floor(184 * (1 - scrollPercentage));
    let colorValueC = Math.floor(8 * (1 - scrollPercentage));

    return `rgb(${colorValue}, ${colorValueB}, ${colorValueC})`;
  };

  return (
    <div className="w-full my-96 relative text-start flex items-center justify-center">
      <div className="flex items-center justify-center w-full flex-col text-start">
        <div className="name-container w-full md:w-full lg:w-full sticky top-0 z-10">
          <Parallax translateX={["-30vw", "35vw"]}>
            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl h-36"
              style={{ color: calculateColor() }}
            >
              {`HOLA I'M`}&nbsp;<span className="name-slide">{names[nameIndex]}</span>
            </h1>
          </Parallax>
        </div>

        <div className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl pt-5 w-3/4 md:w-2/3 lg:w-1/2 text-start">
          <Parallax translateX={["30vw", "-65vw"]}>
            {text.map((sentence, index) => (
              <p
                key={index}
                style={{
                  color: calculateColor(),
                  transition: "color 0.3s ease-out",
                  marginBottom: "20px",
                }}
              >
                {sentence}
              </p>
            ))}
          </Parallax>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
