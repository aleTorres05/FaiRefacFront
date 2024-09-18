import Logo from "./Logo";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <>
      <header className="sticky top-0 flex-wrap z-20 bg-[#161616] flex lg:col-start-1 lg:col-end-13 items-center justify-between border-b-2 border-[#D16527]">
        <Logo />
        <Navbar />
      </header>
    </>
  );
}
