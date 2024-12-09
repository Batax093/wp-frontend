import { useState } from "react";
import useGetProjects from "../hooks/useGetProject";
import usePostProject from "../hooks/usePostProject";
import useDeleteProject from "../hooks/useDeleteProject";
import toast from "react-hot-toast";
import { Parallax } from "react-scroll-parallax";
import convertToBase64 from "../utils/convert64base";
import { useAuthContext } from "../context/AuthContext";
import slugify from "../utils/slugify";

const ProjectSection = () => {
  const { loading: getLoading, projects, getProjects } = useGetProjects();
  const { loading: postLoading, postProject } = usePostProject();
  const { loading: deleteLoading, deleteProject } = useDeleteProject();
  const { authUser } = useAuthContext();
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setGithub("");
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [github, setGithub] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const base64Image = await convertToBase64(file);
    setImage(base64Image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = { title, description, github, image};    

    await postProject(projectData, async () => {
      resetForm();
      document.getElementById("project_modal").close();
      toast.success("Project added successfully!");
      await getProjects();
    });
  };


  const handleDelete = async (slug) => {
    if (!slug) return;
    const normalizedSlug = encodeURIComponent(slugify(slug));

    await deleteProject(normalizedSlug, async () => {
      toast.success("Project deleted successfully!");
      document.getElementById("project_modal").close();
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
                    {authUser && (
                      <button
                        className="btn btn-primary bg-red-500 border-none hover:bg-red-300"
                        onClick={() => handleDelete(project.title)}>
                        {deleteLoading ? <span className="loading loading-spinner loading-lg"></span> : "Delete"}
                      </button>
                    )}
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
