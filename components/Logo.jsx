import Image from "next/image";
import logo from "../assets/images/Logo.png";

export default function Logo() {
  return (
    <div>
      <Image
        className="sm:h-[30px] sm:w-[155px] lg:h-[35px] lg:w-[155px] mb-2 lg:mb-3 lg:ml-3"
        src={logo}
        alt="logo"
      />
    </div>
  );
}
