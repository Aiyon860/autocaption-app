import { useState, type FC } from "react";
import { Github } from "lucide-react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  Link,
  Button,
} from "@heroui/react";
import { AcmeLogo } from "../logo/Logo";
import type TopBarProps from "../../types/TopBar";
import { NavLink } from "react-router";

const TopBar: FC<TopBarProps> = ({ title, githubUrl }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" className="min-w-full border-b border-gray-200">
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NavLink to={'/'} className="flex justify-center items-center">
            <AcmeLogo />
            <p className="font-bold text-inherit">{title}</p>
          </NavLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <Button 
          as={Link}
          href={githubUrl}
          color="primary" 
          variant="ghost" 
          startContent={<Github className="w-4 h-4" />}
        >
          <span className="hidden sm:inline">View on GitHub</span>
          <span className="sm:hidden">GitHub</span>
        </Button>
      </NavbarContent>
    </Navbar>
  );
};

export default TopBar;
