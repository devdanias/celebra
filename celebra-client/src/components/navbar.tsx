import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/modal";

import { siteConfig } from "@/config/site";
import { LoginModal } from "@/components/loginmodal";

const LogoutButton = ({
  username,
  logout,
}: {
  username?: string;
  logout: () => void;
}) => (
  <Dropdown>
    <DropdownTrigger>
      <Button
        className="text-sm bg-pink-100 font- text-default-600"
        // variant="bordered"
      >
        {username}
      </Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Static Actions" onAction={logout}>
      <DropdownItem key="logout" className="text-danger" color="danger">
        Logout
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);

export const Navbar = () => {
  const [userData, setUserData] = useState<{ id: number; nome: string }>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) return;

    const getData = async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_API}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Faça login");
        } else {
          alert("Deu erro");
        }
        console.log(await res.json());

        return;
      }

      const data = await res.json();

      setUserData({ id: data.id, nome: data.username });
      setIsLoggedIn(true);
    };

    getData();
    // if ()
  }, [isLoggedIn]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <LoginModal
        isOpen={isOpen}
        setIsLoggedIn={setIsLoggedIn}
        onOpenChange={onOpenChange}
      />
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <p className="font-bold text-inherit">Celebra</p>
          </Link>
        </NavbarBrand>
        <div className="hidden md:flex gap-4 justify-start ml-2">
          {siteConfig.navMenuItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {/* <ThemeSwitch /> */}
        </NavbarItem>
        <NavbarItem className="flex">
          {isLoggedIn ? (
            <LogoutButton logout={logout} username={userData?.nome} />
          ) : (
            <Button
              className="text-sm bg-pink-100 font-normal text-default-600"
              variant="flat"
              onPress={onOpen}
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-2" justify="end">
        {/* <ThemeSwitch /> */}
        {isLoggedIn ? (
          <LogoutButton logout={logout} username={userData?.nome} />
        ) : (
          <Button
            className="text-sm bg-pink-100 font-normal text-default-600 sm:px-2"
            variant="flat"
            onPress={onOpen}
          >
            Login
          </Button>
        )}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="foreground" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
