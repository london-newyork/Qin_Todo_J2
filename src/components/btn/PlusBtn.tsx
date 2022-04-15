import Image from "next/image";
import type { VFC } from "react";

type PlusBtnProps = {
  onClick: () => void;
};

export const PlusBtn: VFC<PlusBtnProps> = (props) => {
  return (
    <div>
      <div className="relative">
        <button
          className="box-border flex justify-center items-center w-[24px] h-[24px] bg-[#C2C6D2] rounded-full border-solid cursor-pointer"
          onClick={props.onClick}
        >
          <Image alt="plus" src="/plus_icon.png" width="11px" height="11px" />
        </button>
      </div>
    </div>
  );
};
