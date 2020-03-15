import React from "react";
import path from "path";
import makeNavBarLayout from "./nav-bar";
import Link from "next/link";

const NavBarLayout = makeNavBarLayout();

export default frontMatter => ({ children: content }) => {
  const color = frontMatter.color || "blue";

  return (
    <NavBarLayout>
      <div className={`bg-${color}-500 pt-20 pb-24`}>
        <div className="max-w-screen-sm lg:max-w-screen-md mx-auto text-center text-white">
          <h1 className="text-6xl">{frontMatter.title || PROJECT_NAME}</h1>
          <h2 className={`text-2xl font-light text-${color}-100`}>
            {frontMatter.tagline}
          </h2>
        </div>
      </div>
      <div className="flex-1 pt-8 pb-32 px-6 max-w-screen-sm lg:max-w-screen-md mx-auto">
        {content}
      </div>
      <div className="w-full flex items-center justify-center bg-gray-200 p-10 border-t-2 border-gray-300">
        <Link href="/docs">
          <button
            className={`border-2 border-${color}-600 text-xl px-6 py-4 rounded text-${color}-700 focus:outline-none hover:text-white hover:bg-${color}-500 focus:text-white focus:bg-${color}-500`}
          >
            Get Started
          </button>
        </Link>
      </div>
    </NavBarLayout>
  );
};
