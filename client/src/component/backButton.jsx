import { Link } from "react-router-dom";

function BackButton({ click }) {
  return (
    <>
      <Link onClick={click} to="/" className="absolute left-5 top-5 px-10 py-2 bg-white">
        back
      </Link>
    </>
  );
}

export default BackButton;
