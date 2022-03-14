import type { VFC } from "react";
import { RadioBtn } from "src/components/btn/RadioBtn/RadioBtn";
import { RadioBtnGroup } from "src/components/btn/RadioBtn/RadioBtnGroup";
import { CopyDeleteIcon } from "src/components/CopyDeleteIcon";
import { NewTask } from "src/components/NewTask";
import { TomorrowTitle } from "src/components/Title/TomorrowTitle";

export const TomorrowTodo: VFC = () => {
  return (
    <div className="flex-1 w-full">
      <TomorrowTitle />
      <RadioBtnGroup>
        <RadioBtn variant="orange" value="task2">
          ESLintをインストール
          <CopyDeleteIcon />
        </RadioBtn>
      </RadioBtnGroup>
      <NewTask />
    </div>
  );
};
