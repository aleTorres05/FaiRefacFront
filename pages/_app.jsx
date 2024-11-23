import Header from "@/components/Header";
import CustomToaster from "@/components/CustomToaster";
import "@/styles/globals.css";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { getUserByEmail } from "./api/user";

export const UserContext = createContext();

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      getUserByEmail(email, token)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          toast.error(error.message || "Ocurrió un error inesperado");
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          router.push("/login");
        });
    } else {
      setUser(null);
    }
  }, [router]);

  return (
    <UserContext.Provider value={user}>
      <Header />
      <Component {...pageProps} />
      <CustomToaster />
    </UserContext.Provider>
  );
}
