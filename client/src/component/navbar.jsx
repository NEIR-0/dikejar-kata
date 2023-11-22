import logos from "../../public/logo/logo-removebg.png";
function Navbar({ logout }) {
  return (
    <>
      <section className="w-full h-14 flex items-center bg-slate-100 shadow-md fixed z-20">
        <div className="w-full h-full relative flex justify-between items-center">
          <img className="w-12 h-10 ms-5" src={logos} alt="" />
          <button onClick={logout} className="px-10 py-4 duration-300 ease-in-out transition-all hover:bg-black hover:text-white">
            Logout
          </button>
        </div>
      </section>
    </>
  );
}

export default Navbar;
