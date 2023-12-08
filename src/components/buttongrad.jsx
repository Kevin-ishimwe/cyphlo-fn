import { NavLink } from "react-router-dom";
function Buttongrad({ text, icon, bg,link }) {
  return (
    <NavLink
      to={link}
      className={`flex text-lg font-semibold transition-all hover:scale-105 ${
        bg.length > 2 ? "bg-black" : "grad_button"
      } px-10 py-2 text-white rounded-full mx-2   `}
    >
      {icon}
      {text}
    </NavLink>
  );
}

export default Buttongrad;
