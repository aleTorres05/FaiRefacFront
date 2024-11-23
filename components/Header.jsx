import { useContext } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import { UserContext } from "@/pages/_app";

export default function Header() {
  const user = useContext(UserContext);

  return (
    <>
      <header className="sticky top-0 pt-2 z-20 w-full bg-[#161616] flex col-start-1 col-end-13 items-center justify-between border-b-2 border-[#D16527]">
        <Logo />
        <Navbar user={user} />
      </header>
    </>
  );
}
