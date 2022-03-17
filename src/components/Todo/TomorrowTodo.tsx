
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/outline";
import type { VFC } from "react";
import { RadioBtn } from "src/components/btn/RadioBtn/RadioBtn";
import { useState } from "react";
import { RadioBtnGroup } from "src/components/btn/RadioBtn/RadioBtnGroup";
import { TomorrowTitle } from "src/components/Title/TomorrowTitle";
import { TodoItem } from "./TodoItem/TodoItem";

type Task = {
  readonly id: string;
  task?: string;
};

 
export const TomorrowTodo = () => {
  const [TomorrowTask, setTomorrowTask] = useState<Task[]>([]);
  
   const handleDuplicate = () => {
    alert("Duplicate");
  };
  const handleTrash = () => {
    alert("Trash");
  };
  return (
    <div className="flex-1 w-full">
      <TomorrowTitle />
      {TomorrowTask.length
        ? TomorrowTask.map((item: Task) => {
            return (
              <RadioBtnGroup key={item.id}>
                <TodoItem task={item.task ? item.task : ""} setTaskList={setTomorrowTask} />
              </RadioBtnGroup>
            );
          })
        : null}
      <RadioBtnGroup>
        <RadioBtn variant="orange" value="task2">
          <div className="group flex space-x-3">
            <p>ESLintをインストール</p>
            <DocumentDuplicateIcon onClick={handleDuplicate} className=" w-5 h-5 opacity-0 group-hover:opacity-100" />
            <TrashIcon onClick={handleTrash} className="w-5 h-5 opacity-0 group-hover:opacity-100" />
          </div>
        </RadioBtn>
        <TodoItem task={""} setTaskList={setTomorrowTask} />
      </RadioBtnGroup>
    </div>
  );
};
