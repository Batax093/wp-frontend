import { Parallax } from "react-scroll-parallax";
import { useState } from "react";
import usePostContact from "../hooks/usePostContact";

const ShowCase = () => {
  const { loading, postContact } = usePostContact();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSendContact = async (e) => {
    e.preventDefault();
    await postContact(name, email, message, resetForm);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    document.getElementById("contact_modal").close();
  };

  return (
    <div className="w-full flex flex-col justify-between items-center py-24 md:py-36 lg:py-48">
      <div className="flex flex-col lg:flex-row items-between justify-around w-full max-w-6xl h-full space-y-12 lg:space-y-0 lg:space-x-8">
        {/* Image with fade-in effect */}
        <Parallax
          translateY={["-20vh", "10vh"]}
          opacity={[-2, 4]}
          className="flex justify-center items-center w-full lg:w-full z-10">
          <div className="flex justify-center w-full lg:w-full">
            <img
              src="DSC04673.JPG"
              alt="Photo"
              className="max-w-full h-full rounded-3xl shadow-lg"
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
            <p className="text-xl md:text-2xl lg:text-3xl text-center md:text-start xl:text-justify font-normal">
              Hi, I’m Fredrik, a student who’s passionate about both backend and frontend development. I love exploring the full stack and building
              seamless, user-friendly applications. This website is my portfolio – a place where you can discover my projects, learn about my journey,
              and connect with me.
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href=""
              className="mt-2 text-black py-4 px-8 text-lg hover:shadow-2xl transition-shadow duration-300 rounded-full"
              onClick={() => document.getElementById("contact_modal").showModal()}>
              {`Let's Connect`}
            </a>
          </div>
        </Parallax>
      </div>
      
      {/* Modal content */}
      <dialog
        id="contact_modal"
        className="modal modal-bottom sm:modal-middle">
        <div className="modal-box flex flex-col items-center justify-center bg-yellow-500 relative p-8 rounded-lg shadow-lg">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 focus:outline-none"
            onClick={() => document.getElementById("contact_modal").close()}>
            ✕
          </button>
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mb-6 text-center">Contact Me</h1>
            <form
              onSubmit={handleSendContact}
              className="space-y-4 w-full">
              <div className="space-y-4 flex flex-col items-center w-full">
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-yellow-100 input input-success w-full max-w-xs border-none rounded-lg px-4 py-2 text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="bg-yellow-100 input input-success w-full max-w-xs border-none rounded-lg px-4 py-2 text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  placeholder="Message"
                  className="bg-yellow-100 input input-success w-full max-w-xs h-24 border-none rounded-lg px-4 py-2 resize-none text-black"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  disabled={loading}
                  type="submit"
                  className="submit-btn justify-center self-center px-10 py-4 mt-7 bg-white rounded-3xl text-black whitespace-nowrap hover:bg-gray-300 max-md:px-5 hover:text-black">
                  {loading ? <span className="loading loading-spinner loading-xl"></span> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ShowCase;
