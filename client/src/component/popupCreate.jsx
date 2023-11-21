import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "./backButton";
function PopUpCreate({ click }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    language: "",
  });

  const inputUser = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  // console.log(form);

  const submitUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/games", form, {
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      // console.log(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* form create room */}
      <section className="w-full h-screen bg-red-400 z-20 fixed left-0 top-0 flex justify-center items-center flex-col">
        <BackButton click={click} />
        <div className="bg-yellow-400 p-10 rounded-md">
          <h1 className="text-[50px] text-center mb-5 text-white font-bold">Create rooms</h1>
          <form onSubmit={submitUser} className="bg-blue-500 p-10">
            <ul>
              <li className="flex flex-col">
                <label htmlFor="title" className="text-white">
                  Title:
                </label>
                <input onChange={inputUser} className="px-3 mt-2 py-2 rounded-md" type="text" name="title" id="title" />
              </li>
              <li className="mt-4">
                <select onChange={inputUser} className="w-full py-2 px-2" name="language">
                  <option value="">Selecet bahasa</option>
                  <option value="id">Indonesia</option>
                  <option value="en">english</option>
                </select>
              </li>
            </ul>
            <div className="w-full flex justify-center items-center">
              <button className="w-[200px] px-4 py-2 bg-white mt-4 rounded-md m-auto">submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default PopUpCreate;
