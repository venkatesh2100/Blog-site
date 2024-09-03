export const Greeter = () => {
  return (
    <div className="flex justify-center bg-slate-300  h-screen flex-col ">
      <div className="flex justify-center  ">
        <div className="max-w-lg">
          <div className="max-w-md font-bold text-3xl text-center text-black ">
            “Your first blog posts won’t be perfect, but you just have to do it.
            You have to start somewhere.”
          </div>
          <div className="flex-col px-10">
            <div className="text-black text-xl max-w-md  mt-4 font-semibold ">
              – Shane Brake
            </div>
            <div className=" max-w-md font-light text-sm  text-gray-700 ">
              Digital Marketer | UCLA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
