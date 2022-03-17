import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/outline";
import type { VFC } from "react";
import { RadioBtn } from "src/components/btn/RadioBtn/RadioBtn";
import { useState } from "react";
import { RadioBtnGroup } from "src/components/btn/RadioBtn/RadioBtnGroup";
import { TodayTitle } from "src/components/Title/TodayTitle";
import { TodoItem } from "./TodoItem/TodoItem";

type Task = {
  readonly id: string;
  task?: string;
};

  const handleDuplicate = () => {
    alert("Duplicate");
  };
  const handleTrash = () => {
    alert("Trash");
  };





export const TodayTodo = () => {
  const [todayTask, setTodayTask] = useState<Task[]>([]);

  return (
    <div className="flex-1 w-full">
      <TodayTitle />
      {todayTask.length
        ? todayTask.map((item: Task) => {
            return (
              <RadioBtnGroup key={item.id}>
                <TodoItem task={item.task ? item.task : ""} setTaskList={setTodayTask} />
              </RadioBtnGroup>
            );
          })
        : null}
      <RadioBtnGroup>
        <RadioBtn variant="rose" value="task1">
          <div className="group flex space-x-3">
            <p>Next.jsをインストール</p>
            <DocumentDuplicateIcon onClick={handleDuplicate} className=" w-5 h-5 opacity-0 group-hover:opacity-100" />
            <TrashIcon onClick={handleTrash} className="w-5 h-5 opacity-0 group-hover:opacity-100" />
          </div>
        </RadioBtn>

        <TodoItem task={""} setTaskList={setTodayTask} />
      </RadioBtnGroup>
    </div>
  );
};
