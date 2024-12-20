const Journey = () => {
  return (
    <div className="w-full">
      <div className="h-screen w-full flex flex-col md:flex-row lg:flex-row items-center border-y-2 border-t-0 border-black justify-center">
        <div className="w-full h-full flex items-center justify-center lg:border-x-2 lg:border-black border-b-2 lg:border-b-0 border-black">
          <div className="flex flex-col gap-6 lg:gap-10 w-full lg:w-1/2">
            <div className="font-medium text-center text-2xl lg:text-3xl text-black">Discipline</div>
            <div className="font-normal text-center text-lg lg:text-2xl text-gray-500">
              Life, Work, Academic, Hobby, and many more, driven by passion
            </div>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex flex-col gap-6 lg:gap-10 w-full lg:w-1/2">
            <div className="font-medium text-center text-2xl lg:text-3xl text-black">Passion</div>
            <div className="font-normal text-center text-lg lg:text-2xl text-gray-500">And passion led me to build this website</div>
          </div>
        </div>
      </div>

      <div className="h-screen flex flex-col md:flex-row lg:flex-row items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <figure className="w-full h-full">
            <img
              src="../../public/codingpixel.gif"
              alt="lol"
              className="w-full h-full object-cover"
            />
          </figure>
        </div>
        <div className="w-full h-full flex items-center justify-center ">
          <div className="flex flex-col gap-6 lg:gap-10 w-full lg:w-1/2">
            <div className="font-normal text-center text-sm md:text-xs lg:text-3xl text-black">It all started in 2021 where I began to learn about tech</div>
            <div className="font-normal text-center text-sm md:text-xs lg:text-3xl text-bluePastel">
              And come to Surabaya to become a student at the Universitas Pembangunan Nasional Veteran Jawa Timur
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen flex flex-col md:flex-row lg:flex-row items-center justify-center border-y-2 border-black">
        <div className="w-full h-full flex items-center justify-center ">
          <div className="flex flex-col gap-6 lg:gap-10 w-full lg:w-1/2">
            <div className="font-medium text-center text-sm md:text-xs lg:text-3xl text-bluePastel">Through my academic journey, I have gained some experience</div>
            <div className="font-normal text-center text-sm md:text-xs lg:text-2xl text-black">
              I have participated in the MSIB Batch 5 program at Infinite Learning and gained a Certificate of Red Hat Certified System Administrator.
              Furthermore, I also participated in the Zegasoft Intern Program as Backend Developer, and here I learn more about web development.
            </div>
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <figure className="w-full h-full">
            <img
              src="../../public/cuek.gif"
              alt="lol"
              className="w-full h-full object-cover"
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Journey;
