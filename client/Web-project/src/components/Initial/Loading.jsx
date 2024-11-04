import React from "react";
import { MoonLoader } from "react-spinners";
const Loading = () => {
  return (
    <section className="flex flex-col gap-10 justify-center items-center h-svh">
      
      <MoonLoader color="#82c557" loading size={100} speedMultiplier={0.4} />
    </section>
  );
};

export default Loading;
