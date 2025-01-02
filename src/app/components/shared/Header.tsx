import Image from "next/image";
import { ModeToggle } from "./switch-theme";

const Header = () => {
  return (
    <header className="w-full h-[70px] md:h-[150px] flex items-center justify-between px-[50px] md:px-[150px] fixed top-0 left-0 z-50">
      <a href={"/"}>
        <Image
          className="flex dark:hidden"
          src={"/logo-light.svg"}
          alt="logo"
          width={101}
          height={32}
        />
        <Image
          className="hidden dark:flex"
          src={"/logo-dark.svg"}
          alt="logo"
          width={101}
          height={32}
        />
      </a>

      <ModeToggle />
    </header>
  );
};

export default Header;
