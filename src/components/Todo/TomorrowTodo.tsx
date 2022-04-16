import { useState } from "react";
import { CopyBtn } from "src/components/btn/CopyBtn";
import { RadioBtnGroup } from "src/components/btn/RadioBtn/RadioBtnGroup";
import { TrashBtn } from "src/components/btn/TrashBtn";
import { TomorrowTitle } from "src/components/Title/TomorrowTitle";

import type { Task } from "./TodoItem/TodoItem";
import { TodoItem } from "./TodoItem/TodoItem";

export const TomorrowTodo = () => {
  const [tomorrowTask, setTomorrowTask] = useState<Task[]>([]);
  const reversedTomorrowTask = tomorrowTask.map((_, i, a) => {
    return a[a.length - 1 - i];
  });

  return (
    <div className="flex-1 w-full">
      <TomorrowTitle />
      {tomorrowTask.length
        ? reversedTomorrowTask.map((item: Task) => {
            return (
              <RadioBtnGroup key={item.id}>
                <TodoItem
                  task={item.task ? item.task : ""}
                  setTaskList={setTomorrowTask}
                  id={item.id}
                  checked={item.checked}
                  tailChecked="checked:bg-secondary-orange"
                  registered={item.registered}
                />
                <div className="flex items-start pb-6 space-x-4">
                  <CopyBtn
                    id={item.id}
                    task={item.task ? item.task : ""}
                    setTaskList={setTomorrowTask}
                    taskList={tomorrowTask}
                    checked={item.checked}
                    registered={item.registered}
                  />
                  <TrashBtn
                    id={item.id}
                    task={item.task ? item.task : ""}
                    setTaskList={setTomorrowTask}
                    taskList={tomorrowTask}
                  />
                </div>
              </RadioBtnGroup>
            );
          })
        : null}
      <RadioBtnGroup>
        <TodoItem
          task={""}
          setTaskList={setTomorrowTask}
          id={"tomorrow"}
          checked={false}
          tailChecked={""}
          registered={false}
        />
      </RadioBtnGroup>
    </div>
  );
};
