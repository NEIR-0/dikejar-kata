import { Link } from "react-router-dom";

function LogoutBtn({ logout }) {
  return (
    <>
      <button onClick={logout} className="absolute left-5 top-5 px-10 py-2 bg-white">
        Logout
      </button>
    </>
  );
}

export default LogoutBtn;
