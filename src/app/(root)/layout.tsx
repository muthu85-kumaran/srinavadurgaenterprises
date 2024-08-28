import Header from "@/components/header";
import Nav from "@/components/nav";
import Slide from "@/components/slide";
import type { Metadata } from "next";
import { Suspense } from "react";
import Loading from "../admin/loading";

export const metadata: Metadata = {
  title: "Sri Navadurga Enterprises",
  description:
    "Sri Navadurga Enterprises, Kirloskar pumps, submersible pumps water pumps",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Header />
        <Nav />
        <Slide />
        {children}
      </div>
    </Suspense>
  );
}
