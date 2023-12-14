import { NavLink } from "react-router-dom";
function Buttongrad({ text, icon, bg, link }) {
  return (
    <NavLink
      to={link}
      className={`mx-1 text-[15px] px-3 py-1 flex items-center md:text-lg font-semibold transition-all hover:scale-105 ${
        bg.length > 2 ? "bg-black" : "grad_button"
      } md:px-10 md:py-2 text-white rounded-full md:mx-2  max-h-fit `}
    >
      {icon}
      {text}
    </NavLink>
  );
}

export default Buttongrad;
