function UserCirlces({ turn }) {
  return (
    <>
      {turn === true && (
        <div className="circle w-[100px] h-[100px] absolute left-1/2 top-1/2 bg-yellow-400 rounded-full flex justify-center items-center flex-col">
          <i className="fa-solid fa-user text-[25px] text-white" />
          <p className="">username</p>
        </div>
      )}
      {turn === false && (
        <div className="circle w-[100px] h-[100px] absolute left-1/2 top-1/2 bg-green-500 rounded-full flex justify-center items-center flex-col">
          <i className="fa-solid fa-user text-[25px] text-white" />
          <p className="">username</p>
        </div>
      )}
    </>
  );
}

export default UserCirlces;
