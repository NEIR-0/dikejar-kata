function UserCirlces({ player, selectedUserId }) {
  const { id, username, isDefeated } = player;

  const isSelected = id == selectedUserId;

  if (isSelected) {
    return (
      <div className="circle w-[100px] h-[100px] absolute left-1/2 top-1/2 bg-yellow-400 rounded-full flex justify-center items-center flex-col">
        <i className="fa-solid fa-user text-[25px] text-white" />
        <p className="text-white">{username}</p>
      </div>
    );
  } else if (!isSelected) {
    if (!isDefeated) {
      return <div className="circle w-[100px] h-[100px] absolute left-1/2 top-1/2 bg-green-500 rounded-full flex justify-center items-center flex-col">
        <i className="fa-solid fa-user text-[25px] text-white" />
        <p className="text-white">{username}</p>
      </div>
    }

    return (
      <div className="circle w-[100px] h-[100px] absolute left-1/2 top-1/2 bg-gray-500 rounded-full flex justify-center items-center flex-col">
        <i className="fa-solid fa-user text-[25px] text-white" />
        <p className="text-white">{username}</p>
      </div>
    );
  }
}

export default UserCirlces;
