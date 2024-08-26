import type { Metadata } from "next";
import NavBar from "./_components/NavBar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export const dynamic = "force-dynamic";
import { FaBars } from "react-icons/fa";
import { Suspense } from "react";
import Loading from "./loading";
import { auth } from "@/auth";
import { CreditCard, Link, LogOut, Settings, User } from "lucide-react";
import ForbiddenPage from "@/components/forbidden-403";
import SignOutButton from "@/components/signout-button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CompanyInfo from "./_components/companyinfo";
export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin Panel",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user?.role !== "Admin") {
    return <ForbiddenPage />;
  }

  return (
    <div className="flex min-h-full w-full">
      <div className="hidden md:block md:w-[200px]">
        <NavBar />
      </div>
      <div className="bg-background text-foreground-soft w-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-foreground-soft bg-cyan-800 text-slate-50">
          <h1 className="text-2xl font-bold">Sri Navadurga Enterprises</h1>
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
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <div className="md:hidden block pr-4">
              <FaBars size={32} />
            </div>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="">
              <SheetTitle>
                <p className="text-2xl">Sri Navadurga Enterprises</p>
              </SheetTitle>
              <SheetDescription>
                Submersible Pumps, Openwell Pumps, Monoblock Pumps, etc.
              </SheetDescription>
            </SheetHeader>
            <NavBar />
          </SheetContent>
        </Sheet>
        <div className="flex flex-col px-1 pb-3 justify-center items-start w-full ">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
