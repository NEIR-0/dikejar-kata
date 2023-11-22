import { Link } from "react-router-dom";

function LogoutBtn({ logout }) {
  return (
    <>
      <button onClick={logout} className="px-10 py-2 bg-white">
        Logout
      </button>
    </>
  );
}

export default LogoutBtn;
