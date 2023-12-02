import React from "react";

function Buttongrad({ text, icon, bg }) {
  return (
    <button
      className={`flex text-lg font-semibold ${
        bg.length > 2 ? "bg-black" : "grad_button"
      } px-10 py-2 text-white rounded-full mx-2`}
    >
      {icon}
      {text}
    </button>
  );
}

export default Buttongrad;
