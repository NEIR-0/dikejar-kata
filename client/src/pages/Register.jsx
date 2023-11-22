import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState({
    username: "",
  });

  const inputUser = (e) => {
    const { name, value } = e.target;
    setUsername({
      ...username,
      [name]: value,
    });
  };

  const submitUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/register", username);
      localStorage.access_token = data.access_token;
      localStorage.userId = data.userId; // userId

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="bgImg w-full h-screen flex justify-center items-center bg-[#ecf0f1]">
        <div className="flex justify-center items-center flex-col">
          <div className="w-[40%] mb-7">
            <img src="../../public/COMIC-removebg.png" alt="" />
          </div>
          <div className="text-center py-2 rounded-md shadow-md w-[90%]">
            <h1 className="text-[60px] mb-10 text-[#a7a5a5] font-sans italic font-extrabold">Fill Your Username!</h1>
            <form onSubmit={submitUser} className=" w-[500px] h-fit m-auto">
              <div>
                <input onChange={inputUser} className="border-4 w-[60%] h-[40px] mb-5 px-5 rounded-md" type="text" name="username" placeholder="username..." />
              </div>
              <div>
                <button className="w-[100px] py-2 bg-orange-400 rounded-md text-white">submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
