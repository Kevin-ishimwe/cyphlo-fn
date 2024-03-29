import logo_lefty from "../assets/cyphlo_png1.png";
function Logo() {
  return (
    <div className="flex items-center">
      <img
        src={logo_lefty}
        alt="logo_cyphlo"
        className="h-[5vh] my-4 md:h-[10vh] object-contain rounded-full"
      />
      <h1 className=" text-lg md:text-4xl ml-1 grad1">cypho</h1>
    </div>
  );
}

export default Logo;
