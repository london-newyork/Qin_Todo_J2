import { useState } from "react";
import { CopyBtn } from "src/components/btn/CopyBtn";
import { RadioBtnGroup } from "src/components/btn/RadioBtn/RadioBtnGroup";
import { TrashBtn } from "src/components/btn/TrashBtn";
import { SomeTimeTitle } from "src/components/Title/SomeTimeTitle";

import type { Task } from "./TodoItem/TodoItem";
import { TodoItem } from "./TodoItem/TodoItem";

export const SomeTimeTodo = () => {
  const [someTimeTask, setSomeTimeTask] = useState<Task[]>([]);

  return (
    <div className="flex-1 w-full">
      <SomeTimeTitle />
      {someTimeTask.length
        ? someTimeTask.map((item: Task) => {
            return (
              <RadioBtnGroup key={item.id}>
                <TodoItem
                  task={item.task ? item.task : ""}
                  setTaskList={setSomeTimeTask}
                  id={item.id}
                  checked={item.checked}
                  tailChecked="checked:bg-tertiary-yellow"
                  registered={item.registered}
                />
                <div className="flex pb-6 m-auto space-x-4">
                  <CopyBtn
                    id={item.id}
                    task={item.task ? item.task : ""}
                    setTaskList={setSomeTimeTask}
                    taskList={someTimeTask}
                  />
                  <TrashBtn
                    id={item.id}
                    task={item.task ? item.task : ""}
                    setTaskList={setSomeTimeTask}
                    taskList={someTimeTask}
                  />
                </div>
              </RadioBtnGroup>
            );
          })
        : null}
      <RadioBtnGroup>
        <TodoItem task={""} setTaskList={setSomeTimeTask} id={""} checked={false} tailChecked={""} registered={false} />
      </RadioBtnGroup>
    </div>
  );
};
