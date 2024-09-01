import useGetProjects from "../hooks/useGetProject";
import usePostProject from "../hooks/usePostProject";
import toast from "react-hot-toast";
import { useState } from "react";
import { Parallax } from "react-scroll-parallax";
import convertToBase64 from "../utils/convert64base";
import { useAuthContext } from "../context/AuthContext";

const ProjectSection = () => {
  const { loading: postLoading, postProject } = usePostProject();
  const { loading: getLoading, projects, getProjects } = useGetProjects();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [github, setGithub] = useState("");
  const { authUser } = useAuthContext();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64Image = await convertToBase64(file);
    setImage(base64Image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postProject({ title, description, image, github }, async () => {
      setTitle("");
      setDescription("");
      setImage(null);
      setGithub("");
      document.getElementById("project_modal").close();
      toast.success("Project added successfully!");
      await getProjects();
    });
  };

  return (
    <div className="w-full mt-32 flex justify-center flex-col items-center py-32 md:py-48 lg:py-64">
      {authUser && (
        <div className="w-full md:w-3/4 flex justify-center items-center p-10">
          <button
            className="btn btn-primary bg-yellow-500 hover:bg-yellow-300 rounded-xl border-none"
            onClick={() => document.getElementById("project_modal").showModal()}>
            Add Project
          </button>
        </div>
      )}

      {/* Project Submission Modal */}
      <dialog
        id="project_modal"
        className="modal modal-bottom sm:modal-middle">
        <form
          onSubmit={handleSubmit}
          className="modal-box space-y-4 bg-yellow-500">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("project_modal").close()}>
            ✕
          </button>
          <h3 className="font-bold text-lg text-black">Add New Project</h3>
          <input
            type="text"
            placeholder="Project Title"
            className="input input-bordered w-full bg-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Project Github"
            className="input input-bordered w-full bg-white"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
          <textarea
            placeholder="Project Description"
            className="textarea textarea-bordered w-full bg-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full bg-white"
          />
          <button
            type="submit"
            disabled={postLoading}
            className="btn btn-primary w-full bg-white border-none hover:bg-yellow-300">
            {postLoading ? <span className="loading loading-spinner loading-lg"></span> : "Add Project"}
          </button>
        </form>
      </dialog>

      {/* Displaying Projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20 w-3/4">
        {getLoading ? (
          <div className="flex items-center justify-center loading loading-spinner loading-lg text-center">Loading Projects...</div>
        ) : (
          projects.map((project, index) => (
            <Parallax
              key={index}
              speed={index % 2 === 0 ? -1 : 1}
              opacity={[-2, 4]}
              easing="easeOutQuad"
              scale={[0.75, 1]}
              className="flex justify-center">
              <div className="card bg-yellow-500 w-full shadow-xl transform transition-transform duration-300 hover:scale-105">
                <figure>
                  <img
                    src={project.image}
                    alt={project.title}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-black">{project.title}</h2>
                  <p className="text-black">{project.description}</p>
                  <div className="card-actions justify-end">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary bg-white border-none hover:bg-yellow-300">
                      Github
                    </a>
                  </div>
                </div>
              </div>
            </Parallax>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectSection;
