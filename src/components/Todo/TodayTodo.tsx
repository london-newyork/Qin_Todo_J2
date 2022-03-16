import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/outline";
import type { VFC } from "react";
import { RadioBtn } from "src/components/btn/RadioBtn/RadioBtn";
import { RadioBtnGroup } from "src/components/btn/RadioBtn/RadioBtnGroup";
import { NewTask } from "src/components/NewTask";
import { TodayTitle } from "src/components/Title/TodayTitle";

export const TodayTodo: VFC = () => {
  const handleDuplicate = () => {
    alert("Duplicate");
  };
  const handleTrash = () => {
    alert("Trash");
  };
  return (
    <div className="flex-1 w-full">
      <TodayTitle />
      <RadioBtnGroup>
        <RadioBtn variant="rose" value="task1">
          <div className="group flex space-x-3">
            <p>Next.jsをインストール</p>
            <DocumentDuplicateIcon onClick={handleDuplicate} className=" w-5 h-5 opacity-0 group-hover:opacity-100" />
            <TrashIcon onClick={handleTrash} className="w-5 h-5 opacity-0 group-hover:opacity-100" />
          </div>
        </RadioBtn>
      </RadioBtnGroup>
      <NewTask />
    </div>
  );
};
