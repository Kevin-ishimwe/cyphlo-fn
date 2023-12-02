import { useState } from "react";
import Navbar from "../components/Navbar";
import CamStream from "../components/camera";

function Landing() {
  const [interests, setinterests] = useState(["random"]);
  return (
    <div>
      <Navbar />
      <div className="flex  h-50%">
        <div className="w-[60%] mx-2">
          <h1 className="text-[2.7em]  pt-[15vh] font-extrabold font-['Oswald']">
            Chat with random strangers, make friends, embrace the excitement of
            connecting with diverse individuals.
          </h1>
          <input
            type="text"
            autoFocus
            placeholder="Enter nick name"
            className="mt-3 w-full border-b-2 border-black py-3 bg-inherit placeholder:text-[#854a4a] focus:outline-none"
          />
          <input
            type="text"
            placeholder="interests"
            onBlur={(e) => {
              setinterests((prev) => [...prev, e.target.value]);
            }}
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                console.log(e.target);
                e.preventDefault();
                setinterests((prev) => [...prev, e.target.value]);
                e.target.value = "";
              }
            }}
            className="mt-1 w-[20%] border-b-2 border-black py-3 bg-inherit placeholder:text-[#854a4a] focus:outline-none"
          />
          <div className="flex">
            {interests.map((item) => {
              const set = Math.floor(Math.random() * 16777215).toString(16);
              const bg = "#" + "0".repeat(6 - set.length) + set;
              console.log(bg);
              return (
                <p className={` px-4 bg-[${bg}] w-fit  mt-2 py-1 ext-black`}>
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <CamStream />
      </div>
    </div>
  );
}

export default Landing;
