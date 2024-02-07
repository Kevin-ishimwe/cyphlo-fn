const Spinners = () => {
  return (
    <div className="fixed w-full h-screen flex items-center justify-center">
      <div className="bg-red-400 w-[20em] h-[20em] rounded-full flex items-center animate-[ping_1.2s_infinite]">
        <div className="bg-blue-400 w-[18em] h-[18em] rounded-full mx-auto flex items-center animate-[ping_1s_infinite]">
          <div className="bg-green-400 w-[15em] h-[15em] rounded-full mx-auto flex items-center justify-center animate-[ping_2s_linear_infinite]">
            loading
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinners;
