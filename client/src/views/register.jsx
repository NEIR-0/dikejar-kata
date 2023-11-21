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
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="w-full h-screen flex justify-center items-center bg-[#ecf0f1]">
        <div className="text-center bg-green-400 p-20 rounded-md shadow-md w-[90%] md:w-fit">
          <h1 className="text-[25px] mb-10 text-white font-bold md:text-[40px]">Lets have fun!</h1>
          <form onSubmit={submitUser} className=" w-[150px] h-fit m-auto">
            <input onChange={inputUser} className="w-full h-[35px] mb-5 px-5 rounded-md" type="text" name="username" placeholder="username..." />
            <button className="w-[100px] py-2 bg-orange-400 rounded-md text-white">submit</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
