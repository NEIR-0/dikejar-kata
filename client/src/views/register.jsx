import { useState } from "react";

function Register() {
  return (
    <>
      <section className="w-full h-screen flex justify-center items-center bg-[#ecf0f1]">
        <div className="text-center bg-green-400 p-20 rounded-md shadow-md w-[90%] md:w-fit">
          <h1 className="text-[25px] mb-10 text-white font-bold md:text-[40px]">Lets have fun!</h1>
          <form className=" w-[150px] h-fit m-auto">
            <input className="w-full h-[35px] mb-5 px-5 rounded-md" type="text" name="username" placeholder="username..." />
            <button className="w-[100px] py-2 bg-orange-400 rounded-md text-white">submit</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
