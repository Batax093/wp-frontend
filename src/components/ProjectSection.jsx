import { useState } from "react";
import useGetProjects from "../hooks/useGetProject";
import usePostProject from "../hooks/usePostProject";
import toast from "react-hot-toast";
import useDeleteProject from "../hooks/useDeleteProject";
import convertToBase64 from "../utils/convert64base";
import { useAuthContext } from "../context/AuthContext";
import { Parallax } from "react-scroll-parallax";

const ProjectSection = () => {
  const { loading: getLoading, projects, getProjects } = useGetProjects();
  const { loading: postLoading, postProject } = usePostProject();
  const { loading: deleteLoading, deleteProject } = useDeleteProject();
  const { authUser } = useAuthContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [github, setGithub] = useState("");
  const [tech, setTech] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64Image = await convertToBase64(file);
    setImage(base64Image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = { title, description, image, github, tech };
    await postProject(projectData, async () => {
      resetForm();
      document.getElementById("project_modal").close();
      toast.success("Project added successfully!");
    });
    await getProjects();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setGithub("");
    setTech("");
  };

  const handleDelete = async (projecttitle) => {
    await deleteProject(projecttitle, async () => {
      toast.success("Project deleted successfully!");
      await getProjects();
    });
  };

  return (
    <div
      id="projects"
      className="w-full flex justify-center items-center py-16">
      {/* Project Submission Modal */}
      <dialog
        id="project_modal"
        className="modal modal-bottom sm:modal-middle text-black">
        <form
          onSubmit={handleSubmit}
          className="modal-box space-y-4 bg-white">
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
          <input
            type="text"
            placeholder="Project Technologies"
            className="input input-bordered w-full bg-white"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
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
      <div
        id="test"
        className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 xl:flex-row justify-around mt-20 space-y-10 md:space-y-0 md:space-x-10 sm:justify-center sm:items-center max-h-full">
        <div className="flex items-center justify-center text-center">
          {authUser && (
            <div className="flex justify-center items-center p-10 sm:p-2 md:p-8">
              <button
                className="font-normal text-black text-xl hover:text-customYellow transition-colors duration-300"
                onClick={() => document.getElementById("project_modal").showModal()}>
                Add Project
              </button>
            </div>
          )}
          <p className="text-black text-xl md:text-2xl xl:text-3xl sm:text-center">I learn how to code by doing some Projects</p>
        </div>
        {getLoading ? (
          <div className="w-full items-center flex justify-center">
            <div className="flex items-center justify-center loading loading-spinner loading-xl text-center">Loading Projects...</div>
          </div>
        ) : (
          projects.map((project, index) => (
            <Parallax
              key={index}
              speed={15}
              opacity={[-2, 4]}
              easing="easeOutQuad"
              scale={[0.75, 1]}
              className="parallax-element flex flex-col md:flex-row justify-around mt-20 space-y-10 md:space-y-0 md:space-x-10 items-center">
              <div className="card bg-white w-72 mt-20 md:w-96 shadow-xl flex items-center justify-center transform transition-transform box duration-300 hover:scale-105">
                <figure>
                  <img
                    className="w-full h-full object-fill"
                    src={project.image}
                    alt={project.title}
                  />
                </figure>
                <div className="flex justify-around">
                  <div className="card-body">
                    <h2 className="card-title text-black">{project.title}</h2>
                    <h3 className="card-title text-bluePastel">{project.tech}</h3>
                    <p className="text-black">{project.description}</p>
                    <div className="card-actions justify-around">
                      <a
                        href={project.github}
                        target="_blank"
                        className="btn btn-primary bg-white border-none hover:bg-bluePastel hover:text-white hover:shadow-md">
                        Github
                      </a>
                      {authUser && (
                        <div className="card-actions justify-center">
                          <button
                            className="btn btn-primary bg-white border-none hover:bg-red-500 hover:shadow-md hover:text-white"
                            disabled={deleteLoading}
                            onClick={() => handleDelete(project.title)}>
                            {deleteLoading ? <span className="loading loading-spinner loading-lg"></span> : "Delete"}
                          </button>
                        </div>
                      )}
                    </div>
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
