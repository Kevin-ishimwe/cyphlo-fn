import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MirrorStream from "../components/camera";
import { RxCross2 } from "react-icons/rx";

function Landing() {
  const [interests, setinterests] = useState([{ int: "random", bg: "red" }]);
  const [init, setinit] = useState(true);
  const setInterset = (e) => {
    const set = Math.floor(Math.random() * 16777215).toString(16);
    const bg = "#" + "0".repeat(6 - set.length) + set;
    const tag = e.target.value;
    setinterests((prev) => [...prev, { int: tag, bg: bg }]);
    e.target.value = "";
    setinit(false);
  };
  const removeInterest = (id) => {
    let placeholder = interests;
    for (let i = 0; i < interests.length; i++) {
      if (interests[i].int == id) {
        setinterests((prev) => [
          ...placeholder.slice(0, i),
          ...placeholder.slice(i + 1),
        ]);
      }
    }
  };

  useEffect(() => {
    if (init && localStorage.getItem("interests")) {
      setinterests(JSON.parse(localStorage.getItem("interests")));
    }
  }, []);
  useEffect(() => {
    if (!init) {
      localStorage.setItem("interests", JSON.stringify(interests));
    }
  }, [interests]);

  const styleNickname = (e) => {
    e.target.classList.remove("bg-inherit");
    e.target.classList.add("bg-[black]");
    e.target.classList.add("text-white");
    e.target.classList.add("font-bold");
    e.target.blur();
  };
  return (
    <div>
      <Navbar />
      <div className="flex-col-reverse md:flex-row flex flex-wrap md:flex-nowrap  items-center  ">
        <div className="md:w-[60%] mx-2 ">
          <h1 className=" text-4xl pt-0 md:text-[2.7em]  md:pt-[15vh] font-extrabold font-['Oswald'] leading-[1.25em]">
            Chat with random strangers, make friends, embrace the excitement of
            connecting with diverse individuals.
          </h1>
          <input
            type="text"
            autoFocus
            placeholder="Enter nick name"
            className="px-2 mt-3 w-full border-b-2 border-black py-3 bg-inherit placeholder:text-[#854a4a] focus:outline-none"
            onChange={(e) => {
              localStorage.setItem("nickname", JSON.stringify(e.target.value));
            }}
            onFocus={(e) => {
              e.target.classList.remove("bg-[black]");
              e.target.classList.remove("text-white");
            }}
            onBlur={(e) => {
              if (e.target.value.length > 1) {
                styleNickname(e);
              }
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                styleNickname(e);
              }
            }}
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
                setInterset(e);
              }
            }}
            className="mt-1 w-[20%] border-b-2 border-black py-3 bg-inherit placeholder:text-[#854a4a] focus:outline-none"
          />
          <div className="flex flex-wrap">
            {interests.map(({ int, bg }) => {
              return (
                <p
                  key={bg}
                  style={{ background: bg }}
                  className={` px-4 w-fit  mt-2 py-2 ext-black mx-1 flex relative`}
                >
                  {int}
                  <button
                    id={int}
                    onClick={(e) => {
                      removeInterest(e.target.parentNode.id);
                    }}
                  >
                    <RxCross2 className="text-xl py-1 px-1 font-extralight absolute right-0 top-0 text-white hover:scale-105 transition-all" />
                  </button>
                </p>
              );
            })}
          </div>
        </div>
        <MirrorStream />
      </div>
    </div>
  );
}

export default Landing;
