import React from "react";
import ResetBtn from "./Btn/ResetBtn";
import SubmitBtn from "./Btn/SubmitBtn";
import CancelBtn from "./Btn/CancelBtn";

const Btns = React.memo((): JSX.Element => {
  return (
    <div
      className="
        fixed bottom-0 left-0 w-[50%] min-w-[600px] max-w-[50%] h-[80px] 
        shadow-[0_4px_18px_rgba(0,0,0,0.25)] bg-white
        flex items-center justify-between"
    >
      <div className="invisible ml-[10px]"></div>
      <div className="mr-[10px]">
        <ResetBtn />
        <CancelBtn />
        <SubmitBtn />
      </div>
    </div>
  );
});

export default Btns;
