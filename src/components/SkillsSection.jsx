import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import convertToBase64 from "../utils/convert64base";
import usePostSkill from "../hooks/usePostSkill";
import useGetSkills from "../hooks/useGetSkills";
import useDeleteSkills from "../hooks/useDeleteSkills";

const SkillsSection = () => {
  const { loading: postLoading, postSkill } = usePostSkill();
  const { loading: getLoading, skills, getSkills } = useGetSkills();
  const { loading: deleteLoading, deleteSkill } = useDeleteSkills();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const { authUser } = useAuthContext();

  const handleIconChange = async (e) => {
    const file = e.target.files[0];
    const base64Icon = await convertToBase64(file);
    setIcon(base64Icon);
  };

  const resetForm = () => {
    setName("");
    setIcon(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillData = { name, icon };
    await postSkill(skillData, async () => {
      resetForm();
      document.getElementById("skill_modal").close();
      toast.success("Skill added successfully!");
      await getSkills();
    });
  };

  const handleDelete = async (skillname) => {
    await deleteSkill(skillname, async () => {
      toast.success("Skill deleted successfully!");
      await getSkills();
    });
  };

  return (
    <div
      id="skills"
      className="w-full h-screen flex justify-center items-center py-16 sm:max-h-screen md:py-32 lg:py-48">
      {/* Skills Submission Modal */}
      <dialog
        id="skill_modal"
        className="modal modal-bottom sm:modal-middle text-black">
        <form
          onSubmit={handleSubmit}
          className="modal-box space-y-4 bg-white">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("skill_modal").close()}>
            ✕
          </button>
          <h3 className="font-bold text-lg text-black">Add New SKill</h3>
          <input
            type="text"
            placeholder="Skill Title"
            className="input input-bordered w-full bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleIconChange}
            className="file-input file-input-bordered w-full bg-white"
          />
          <button
            type="submit"
            disabled={postLoading}
            className="btn btn-primary w-full bg-white border-none hover:bg-yellow-300">
            {postLoading ? <span className="loading loading-spinner loading-lg"></span> : "Add Skill"}
          </button>
        </form>
      </dialog>

      {/* Display Skills */}
      <div
        id="lol"
        className="flex flex-col sm:grid sm:grid-cols-2 md:grid md:grid-cols-2 xl:flex-row justify-around mt-20 gap-6 space-y-10 md:space-y-0 md:space-x-10 sm:justify-center sm:items-center max-h-screen">
        <div className="flex items-center justify-center text-center">
          {authUser && (
            <div className="flex justify-center items-center p-10 sm:p-2 md:p-8">
              <button
                className="font-normal text-black text-xl hover:text-customYellow transition-colors duration-300"
                onClick={() => document.getElementById("skill_modal").showModal()}>
                Add Skill
              </button>
            </div>
          )}
          <p className="text-bluePastel text-xl sm:text-lg md:text-lg xl:text-3xl sm:text-center">
            And Through it all, I have learned a lot of things.
          </p>
        </div>
        {getLoading ? (
          <div className="w-full items-center flex justify-center">
            <div className="flex items-center justify-center loading loading-spinner loading-xl text-center">Loading Skills...</div>
          </div>
        ) : (
          skills.map((skill, index) => (
            <div
              key={index}
              className="parallax-element flex flex-col md:flex-row justify-around mt-20 space-y-10 md:space-y-0 md:space-x-10 items-center">
              <div className="pt-10 card bg-white w-72 md:w-96 shadow-xl flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                <figure className="overflow-hidden">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                  />
                </figure>
                <div className="flex justify-around">
                  <div className="card-body">
                    <h2 className="card-title text-black justify-center">{skill.name}</h2>
                    {authUser && (
                      <div className="card-actions justify-center">
                        <button
                          className="btn btn-primary border-none bg-white hover:bg-red-500 hover:shadow-md hover:text-white"
                          disabled={deleteLoading}
                          onClick={() => handleDelete(skill.name)}>
                          {deleteLoading ? <span className="loading loading-spinner loading-lg"></span> : "Delete"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
