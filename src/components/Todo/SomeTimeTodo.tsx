import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/outline";
import type { VFC } from "react";
import { RadioBtn } from "src/components/btn/RadioBtn/RadioBtn";
import { useState } from "react";
import { RadioBtnGroup } from "src/components/btn/RadioBtn/RadioBtnGroup";
import { SomeTimeTitle } from "src/components/Title/SomeTimeTitle";
import { TodoItem } from "./TodoItem/TodoItem";

type Task = {
  readonly id: string;
  task?: string;
};

export const SomeTimeTodo = () => {
  const [SomeTimeTask, setSomeTimeTask] = useState<Task[]>([]);
   const handleDuplicate = () => {
    alert("Duplicate");
  };
  const handleTrash = () => {
    alert("Trash");
  };

  return (
    <div className="flex-1 w-full">
      <SomeTimeTitle />
      {SomeTimeTask.length
        ? SomeTimeTask.map((item: Task) => {
            return (
              <RadioBtnGroup key={item.id}>
                <TodoItem task={item.task ? item.task : ""} setTaskList={setSomeTimeTask} />
              </RadioBtnGroup>
            );
          })
        : null}
      <RadioBtnGroup>
        <RadioBtn variant="yellow" value="task3">
          <div className="group flex space-x-3">
            <p>Prettierをインストール</p>
            <DocumentDuplicateIcon onClick={handleDuplicate} className=" w-5 h-5 opacity-0 group-hover:opacity-100" />
            <TrashIcon onClick={handleTrash} className="w-5 h-5 opacity-0 group-hover:opacity-100" />
          </div>
        </RadioBtn>
        <TodoItem task={""} setTaskList={setSomeTimeTask} />
      </RadioBtnGroup>
    </div>
  );
};
