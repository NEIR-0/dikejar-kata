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
  // console.log(username);

  const submitUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/register", username);
      // console.log(data.access_token);
      localStorage.access_token = data.access_token;
      localStorage.access_token = data.userId; // userId

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="bgImg w-full h-screen flex justify-center items-center bg-[#ecf0f1]">
        <div className="flex justify-center items-center flex-col">
          <div className="w-[40%]">
            <img src="../../public/COMIC-removebg.png" alt="" />
          </div>
          <div className="text-center p-20 rounded-md shadow-md w-[90%] md:w-fit ">
            <h1 className="text-[25px] mb-10 text-[#a7a5a5] font-sans italic font-extrabold md:text-[80px]">Fill Your Username!</h1>
            <form onSubmit={submitUser} className=" w-[500px] h-fit m-auto">
              <div>
                <input onChange={inputUser} className="border-4 w-full h-[60px] mb-5 px-5 rounded-md" type="text" name="username" placeholder="username..." />
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
