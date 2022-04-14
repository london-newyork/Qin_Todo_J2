import { useState } from "react";
import { CopyBtn } from "src/components/btn/CopyBtn";
import { RadioBtnGroup } from "src/components/btn/RadioBtn/RadioBtnGroup";
import { TrashBtn } from "src/components/btn/TrashBtn";
import { TodayTitle } from "src/components/Title/TodayTitle";

import type { Task } from "./TodoItem/TodoItem";
import { TodoItem } from "./TodoItem/TodoItem";

export const TodayTodo = () => {
  const [todayTask, setTodayTask] = useState<Task[]>([]);
  const reversedTodayTask = todayTask.map((_, i, a) => {
    return a[a.length - 1 - i];
  });

  return (
    <div className="flex-1 w-full">
      <TodayTitle />
      {todayTask.length
        ? reversedTodayTask.map((item: Task) => {
            return (
              <RadioBtnGroup key={item.id}>
                <TodoItem
                  task={item.task ? item.task : ""}
                  setTaskList={setTodayTask}
                  id={item.id}
                  checked={item.checked}
                  tailChecked="checked:bg-primary-rose"
                  registered={item.registered}
                />
                <div className="flex items-start pb-6 space-x-4">
                  <CopyBtn
                    id={item.id}
                    task={item.task ? item.task : ""}
                    setTaskList={setTodayTask}
                    taskList={todayTask}
                    checked={item.checked}
                  />
                  <TrashBtn
                    id={item.id}
                    task={item.task ? item.task : ""}
                    setTaskList={setTodayTask}
                    taskList={todayTask}
                  />
                </div>
              </RadioBtnGroup>
            );
          })
        : null}
      <RadioBtnGroup>
        <TodoItem
          task={""}
          setTaskList={setTodayTask}
          id={"today"}
          checked={false}
          tailChecked={""}
          registered={false}
        />
      </RadioBtnGroup>
    </div>
  );
};
