"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOutButton() {
  const handleClick = () => {
    signOut();
  };
  return (
    <Button
      variant={"ghost"}
      size={"lg"}
      className="text-left p-0"
      onClick={handleClick}
    >
      Log out
    </Button>
  );
}
