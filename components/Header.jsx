import Logo from "./Logo";
import Navbar from "./Navbar";


export default function Header({ setCurrentPage, currentPage, user }) {
  
  return (
    <>
      <header className="sticky top-0 pt-2 z-20 w-full bg-[#161616] flex col-start-1 col-end-13 items-center justify-between border-b-2 border-[#D16527]">
        <Logo />
        <Navbar setCurrentPage={setCurrentPage} user={user} />
      </header>
    </>
  );
}
