import { useState, useEffect, useRef } from "react";
import { MdOutlineAttachment } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import Buttongrad from "../components/buttongrad";
import { FaVideo } from "react-icons/fa6";
import { IoRefresh } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Spinners from "../components/loaders/Spinners";
import { useLocation } from "react-router-dom";
function Chat({ socket }) {
  const [users, setusers] = useState([]);
  const [message, setmessage] = useState(null);
  const [nickname, setnickname] = useState("randomnoob1");
  const [nickname2, setnickname2] = useState(false);
  const [my_id, setmy_id] = useState(null);
  const [typing, settyping] = useState(false);
  const location = useLocation();
  const messageInputRef = useRef();

  useEffect(() => {
    try {
      setTimeout(() => {
        localStorage.setItem("socket_id", socket.id);
        setmy_id(localStorage.getItem("socket_id"));
        if (localStorage.getItem("socket_id") != undefined) {
          const nick_init = JSON.parse(localStorage.getItem("nickname"));
          console.error(nick_init);
          socket.emit("chat:userconnected", {
            name: nick_init ? nick_init : nickname,
            id: localStorage.getItem("socket_id"),
            recourse: false,
          });
        }
      }, [1000]);
      getMessages(socket);
      socket.on("chat:typing", (typing) => {
        console.log("TYPE SOCKET LISTENER",typing);
        settyping(typing);
      });
      const nick_init = JSON.parse(localStorage.getItem("nickname"));
      if (localStorage.getItem("nickname")) {
        setnickname(nick_init);
      }
    } catch (e) {
      console.log(e.message);
    }
    return clearTimeout();
  }, []);

  useEffect(() => {
    socket.on("chat:userconnected", (data) => {
      localStorage.setItem("room_id", data.room);
      if (data.id && data.id !== localStorage.getItem("socket_id")) {
        setnickname2(data.name);
        localStorage.setItem("friend_name", data.name);
      }
    });
    if (location.pathname !== "/chat") {
      socket.disconnect();
    }
  }, [location]);
  const userPropagation = () => {
    if (localStorage.getItem("socket_id") != undefined) {
      const nick_init = JSON.parse(localStorage.getItem("nickname"));
      socket.emit("chat:userconnected", {
        name: nick_init ? nick_init : nickname,
        recourse: true,
        id: localStorage.getItem("socket_id"),
        room: localStorage.getItem("room_id"),
      });
    }
  };
  const getMessages = (socket) => {
    socket.on("chat:chat", (data) => {
      setusers((prev) => [...prev, data]);
    });
  };
  socket.on("chat:leave", (data) => {
    setnickname2(true);
    socket.disconnect();
  });
  userPropagation();

  return (
    <div className="">
      <div className="fixed  top-[0vh] bg-white w-full z-10">
        <div className="h-[4em] flex items-center md:px-5 py-2 justify-between w-full">
          <div className="flex items-center flex-wrap md:flex-nowrap py-2">
            <img
              src="https://cdn.britannica.com/79/4479-050-6EF87027/flag-Stars-and-Stripes-May-1-1795.jpg"
              alt=""
              className="h-5 md:mx-1"
            />
            <h1 className="font-['Oswald']">@{nickname}</h1>
            <a
              href="/"
              className={"ml-2 font-bold"}
              onClick={() => {
                socket.disconnect();
              }}
            >
              home
            </a>
          </div>
          <div className=" flex">
            <Buttongrad
              text=" random video"
              icon={<FaVideo className="text-3xl mr-2" />}
              bg="black"
            />
            <button className="flex items-center font-bold rounded-full px-4 py-2 bg-red-500 text-white hover:scale-105 transition-all ">
              <IoRefresh className="text-xl font-bold" />
              new user
            </button>
          </div>
        </div>
        {nickname2 == false || nickname == true ? <Spinners /> : ""}
        <div
          className={` w-full flex`}
          style={{
            background:
              nickname2 == false || nickname2 == undefined || nickname2 == true
                ? "#f0adad"
                : "#adf0ad",
          }}
        >
          {nickname2 == false ? (
            <p className="animate-pulse ml-2 flex">
              connecting{" "}
              <span className="text-2xl animate-bounce -mt-3 ml-2">...</span>
            </p>
          ) : (
            <p className="font-[Oswald] ml-6 font-light">
              connected to{" "}
              <span className="font-[500] font-[Oswald]">@{nickname2}</span>
            </p>
          )}
        </div>
      </div>
      <div>
        <div className="mt-12 py-[7vh] overflow-hidden">
          {users.map((item) => {
            return (
              <div
                style={{ justifyContent: item.user == my_id ? "end" : "start" }}
                className={`w-full flex  my-2 relative`}
              >
                <p className=" absolute text-[10px] text-black top-[-1vh]">
                  {item.messages.dateStamp}
                </p>
                <p
                  style={{
                    background: item.user == my_id ? "#6262f2" : "#65db65",
                  }}
                  className={`  max-w-[60%] relative min-w-[20vw] px-2 mt-2 py-2 mx-1 rounded-sm font-['Oswald'] font-light text-white text-lg`}
                >
                  {item.messages.message}
                </p>
              </div>
            );
          })}
          {nickname2 == true ? (
            <div className="backdrop-blur-sm text-center grid justify-center  w-full mb-16 py-4 fixed bottom-[10em]  h-[20em] bg-[rgba(51,51,51,0.11)]">
              <p className="flex text-xl">
                <span className="font-bold text-['Oswald'] mr-2">
                  {localStorage.getItem("friend_name")}
                </span>
                {"  "}
                left the chat
              </p>
              <button
                className="bg-black w-[10em] py-3 text-white transition-all hover:scale-105 my-2 rounded-md h-fit hover:bg-primaryRed"
                onClick={() => {
                  window.location.reload();
                }}
              >
                new friend
              </button>
            </div>
          ) : (
            ""
          )}

          {typing.state && typing.data.id != socket.id ? (
            <div className="mt-5 w-full  py-2 ">
              <p className="flex items-center  bg-[#65db65] w-fit text-3xl px-2 mt-2 py-4 mx-1 rounded-sm font-['Oswald'] font-light text-white">
                <span className="typing h-1 w-1 bg-white mx-1 rounded-full"></span>
                <span className="typing1 h-1 w-1 bg-white mx-1 rounded-full"></span>
                <span className="typing2 h-1 w-1 bg-white mx-1 rounded-full animate"></span>
              </p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="fixed bottom-1.5 w-full right-0 pl-0 md:pl-[10%] z-30">
        <div className="flex absolute right-2 mt-1 bottom-2">
          <MdOutlineAttachment className="text-3xl mx-3" />
          <IoMdSend
            className="text-3xl"
            onClick={() => {
              socket.emit("chat:chat", {
                user: socket.id,
                messages: {
                  dateStamp: Date().split(" ").slice(0, 5).join(" "),
                  message: message,
                },
                room: localStorage.getItem("room_id"),
              });
              messageInputRef.current.value = "";
            }}
          />
        </div>
        <input
          autoFocus
          ref={messageInputRef}
          onChange={(e) => {
            setmessage(e.target.value);
          }}
          type="text"
          className="w-full py-2  px-3 border-2 rounded-full  border-black focus:outline-none font-['Oswald']"
          placeholder="Enter message"
          onKeyDown={(e) => {
            if (e.keyCode == 13) {
              socket.emit("chat:chat", {
                user: socket.id,
                messages: {
                  dateStamp: Date().split(" ").slice(0, 5).join(" "),
                  message: e.target.value,
                },
                room: localStorage.getItem("room_id"),
              });
              e.target.value = "";
              socket.emit("chat:typing", {
                id: socket.id,
                state: "off",
                room: localStorage.getItem("room_id"),
              });
              console.log(e.target)
              e.target.blur()
              
            
            }
          }}
          onFocus={async (e) => {
            socket.emit("chat:typing", {
              id: socket.id,
              state: "on",
              room: localStorage.getItem("room_id"),
            });
          }}
          onBlur={() => {
            socket.emit("chat:typing", {
              id: socket.id,
              state: "off",
              room: localStorage.getItem("room_id"),
            });
          }}
        />
      </div>
    </div>
  );
}

export default Chat;
