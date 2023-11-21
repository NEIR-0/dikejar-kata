import { useState } from "react";

function Register() {
  return (
    <>
      <section className="w-full h-screen bg-purple-500 flex justify-center items-center">
        <div className="text-center bg-green-600 p-10">
          <h1 className="text-[40px]">welcome</h1>
          <form className=" w-[200px] h-fit bg-red-700 flex flex-col justify-between">
            <input className="w-full h-[50px] mb-4 px-5 rounded-md" type="text" name="username" />
            <button className="w-[100px] py-2 bg-blue-500 rounded-md">submit</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
