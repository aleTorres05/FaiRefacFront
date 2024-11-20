import VerifyEmail from "@/components/VerifyEmail";
import { useContext } from "react";
import { UserContext } from "./_app";


export default function EmailVerification() {
  const user = useContext(UserContext);

  return (
    <>
      <VerifyEmail user={user}/>
    </>
  );
}
