import { useState } from "react";
import Navbar from "../components/Navbar";
import CamStream from "../components/camera";

function Landing() {
  const [interests, setinterests] = useState([{ int: "random", bg: "red" }]);

  const setInterset = (e) => {
    const set = Math.floor(Math.random() * 16777215).toString(16);
    const bg = "#" + "0".repeat(6 - set.length) + set;
    const tag = e.target.value;
    setinterests((prev) => [...prev, { int: tag, bg: bg }]);
    e.target.value = "";
  };
  console.log(interests);
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
              if (e.target.value.length > 2) {
                setInterset(e);
              }
            }}
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                console.log(e.target);
                setInterset(e);
              }
            }}
            className="mt-1 w-[20%] border-b-2 border-black py-3 bg-inherit placeholder:text-[#854a4a] focus:outline-none"
          />
          <div className="flex">
            {interests.map(({ int, bg }) => {
              return (
                <p
                  key={bg}
                  style={{ background: bg }}
                  className={` px-4 w-fit  mt-2 py-1 ext-black mx-1`}
                >
                  {int}
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
