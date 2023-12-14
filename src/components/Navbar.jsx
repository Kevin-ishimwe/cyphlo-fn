import Logo from "./logo";
import Buttongrad from "./buttongrad";
import { RiWechat2Fill } from "react-icons/ri";
import { FaVideo } from "react-icons/fa6";
function Navbar() {
  return (
    <div className="flex items-center justify-between border-b-[2px] grad_border">
      <Logo />
      <div className="flex ">
        <Buttongrad
          text="random chat"
          icon={<RiWechat2Fill className="text-3xl mr-2" />}
          bg=""
          link="/chat"
        />
        <Buttongrad
          text=" random video"
          icon={<FaVideo className="text-3xl mr-2" />}
          bg="black"
          link="/videochat"
        />
      </div>
    </div>
  );
}

export default Navbar;
