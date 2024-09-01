import { Parallax } from "react-scroll-parallax";
import usePostSkill from "../hooks/usePostSkill";
import { useState } from "react";
import convertToBase64 from "../utils/convert64base";
import toast from "react-hot-toast";
import useGetSkills from "../hooks/useGetSkills";
import { useAuthContext } from "../context/AuthContext";

const SkillsSection = () => {
  const { loading: postLoading, postSkill } = usePostSkill();
  const { loading: getLoading, skills, getSkills } = useGetSkills();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const { authUser } = useAuthContext();

  const handleIconChange = async (e) => {
    const file = e.target.files[0];
    const base64Icon = await convertToBase64(file);
    setIcon(base64Icon);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postSkill({ name, icon }, async () => {
      setName("");
      setIcon(null);
      document.getElementById("skill_modal").close();
      toast.success("Skill added successfully!");
      await getSkills();
    });
  };

  return (
    <div className="w-full mt-72 flex justify-center items-center my-96 py-96">
      <div className="w-full max-w-7xl flex flex-col items-center">
        {authUser && (
          <div className="w-full md:w-3/4 flex justify-center items-center p-10">
            <button
              className="btn btn-primary bg-yellow-500 hover:bg-yellow-300 rounded-xl border-none"
              onClick={() => document.getElementById("skill_modal").showModal()}>
              Add Skill
            </button>
          </div>
        )}

        {/* Skills Submission Modal */}

        <dialog
          id="skill_modal"
          className="modal modal-bottom sm:modal-middle">
          <form
            onSubmit={handleSubmit}
            className="modal-box space-y-4 bg-yellow-500">
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

        <div className="flex flex-col md:flex-row justify-around mt-20 space-y-10 md:space-y-0 md:space-x-10">
          {getLoading ? (
            <div className="flex items-center justify-center loading loading-spinner loading-lg text-center">Loading Projects...</div>
          ) : (
            skills.map((skill, index) => (
              <Parallax
                key={index}
                speed={25}
                scale={[0.75, 1]}
                easing="easeOutQuad"
                opacity={[-2, 4]}
                className="parallax-element">
                <div className="pt-10 card bg-yellow-500 w-72 md:w-96 shadow-xl flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                  <figure>
                    <img
                      src={skill.icon}
                      alt={skill.name}
                    />
                  </figure>
                  <div className="flex justify-around">
                    <div className="card-body">
                      <h2 className="card-title text-black text-center">{skill.name}</h2>
                    </div>
                  </div>
                </div>
              </Parallax>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
