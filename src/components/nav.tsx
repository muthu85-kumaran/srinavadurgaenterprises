import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <div className="flex gap-3 justify-center items-center w-full h-16 px-4 py-1 text-md font-semibold bg-slate-100">
      <ul className="flex gap-4">
        <li>
          <Link href="">Residential</Link>
        </li>
        <li>
          <Link href="">Commercial</Link>
        </li>
        <li>
          <Link href="">Industry</Link>
        </li>
        <li>
          <Link href="">Agricultural</Link>
        </li>
        <li>
          <Link href="">Services</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
