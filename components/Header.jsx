import Logo from "./Logo";
import Navbar from "./Navbar";
import { getByID } from "@/pages/api/user";
import { useState, useEffect } from "react";

export default function Header({ setCurrentPage, currentPage, user }) {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const userId = localStorage.getItem("userId"); 

        if (token && userId) {
          const userData = await getByID(userId, token);
          setUserData(userData);
          console.log(userData)
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUser();
  }, []);

  
  return (
    <>
      <header className="sticky top-0 pt-2 z-20 w-full bg-[#161616] flex col-start-1 col-end-13 items-center justify-between border-b-2 border-[#D16527]">
        <Logo />
        <Navbar setCurrentPage={setCurrentPage} user={userData} />
      </header>
    </>
  );
}
