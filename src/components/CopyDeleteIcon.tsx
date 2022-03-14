import Image from "next/image";
import type { VFC } from "react";

export const CopyDeleteIcon: VFC = () => {
  return (
    <button>
      <nav className="flex">
        <div className=" ml-4">
          <Image src="/copy-outline.png" width={14.67} height={16.5} alt="deleteicon" className="" />
        </div>
        <div className="ml-[19.33px]">
          <Image src="/delete.png" width={14.67} height={16.5} alt="deleteicon" className="" />
        </div>
      </nav>
    </button>
  );
};
