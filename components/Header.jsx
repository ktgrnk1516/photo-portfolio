import React, { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const menues = [
    {
      name: "CONTACT",
      slug: "contact",
    },
    {
      name: "ABOUT",
      slug: "about",
    },
    {
      name: "WORKS",
      slug: "works",
    },
  ];

  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   getCategories().then((newCategories) => {
  //     setCategories(newCategories);
  //   });
  // }, []);

  return (
    <div className="md:ml-8 md:mr-8 mx-auto px-0 mb-8 sticky top-0 z-50 bg-inherit sm:ml-0 sm:mr-0 ">
      <div className=" w-full inline-block  py-6">
        <div className="text-center mb-4 md:float-left block md:mb-0">
          <Link href="/">
            <span className="sm:ml-0 md:ml-4 lg:ml-4  cursor-pointer text-2xl text-inherit ">
              k t g r n k
            </span>
          </Link>
        </div>
        <div className="text-center md:float-left md:contents ">
          {menues.map((menu, index) => (
            <Link key={index} href={`/${menu.slug}`}>
              <span className="sm:ml-0 md:float-right md:mt-2 lg:mt-2 align-middle text-inherit ml-6 mr-6 cursor-pointer ">
                {menu.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
