import React from "react";

import TMG from "../assets/TMG.png";

const Header = () => {
  return (
    <div>
      <div className="">
        <nav className="flex justify-center items-center" >
          <div className="bg-gray-450 shadow-lg w-3/5 rounded-b-full flex justify-center items-center max-w-96">
            <img className="w-32 h-full" src={TMG} />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
