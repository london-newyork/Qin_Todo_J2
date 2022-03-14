import type { VFC } from "react";
import { RadioBtn } from "src/components/btn/RadioBtn/RadioBtn";
import { RadioBtnGroup } from "src/components/btn/RadioBtn/RadioBtnGroup";
import { CopyDeleteIcon } from "src/components/CopyDeleteIcon";
import { NewTask } from "src/components/NewTask";
import { SomeTimeTitle } from "src/components/Title/SomeTimeTitle";

export const SomeTimeTodo: VFC = () => {
  return (
    <div className="flex-1 w-full">
      <SomeTimeTitle />
      <RadioBtnGroup>
        <RadioBtn variant="yellow" value="task3">
          Prettierをインストール
          <CopyDeleteIcon />
        </RadioBtn>
      </RadioBtnGroup>
      <NewTask />
    </div>
  );
};
