import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { FaSearch } from "react-icons/fa";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { User, CreditCard, Settings, LogOut } from "lucide-react";
import SignOutButton from "./signout-button";
import { auth } from "@/auth";
const Header = async () => {
  const session = await auth();
  return (
    <div className="w-full h-36 bg-lime-200 flex flex-col px-4 py-2">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-2xl font-bold">KIRLOSKAR BROTHERS LIMITED</h1>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <Image src="/KBL-Logo.png" alt="KBL Logo" width={100} height={100} />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Input type="text" placeholder="Search" />
          <Button type="submit" variant={"outline"}>
            <FaSearch />
            <span>&nbsp; Search</span>
          </Button>
        </div>
        <div>
          {session && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="" alt="@shadcn" />
                  <AvatarFallback className="text-stone-800 font-semibold text-sm bg-lime-300">
                    {session?.user?.name
                      ?.split(" ") // Split the string into words
                      .map((word) => word.charAt(0).toUpperCase()) // Get the first letter of each word and capitalize it
                      .join("") || ""}
                  </AvatarFallback>
                </Avatar>
                {/* <Button variant="outline">Open</Button> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{session?.user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>
                    <SignOutButton />
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
