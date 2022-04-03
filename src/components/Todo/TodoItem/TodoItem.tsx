import type { ChangeEvent, Dispatch, KeyboardEventHandler, SetStateAction, VFC } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { PlusBtn } from "src/components/btn/PlusBtn";

export type Task = {
  readonly id: string;
  task?: string;
  checked: boolean;
};

type TodoItemProps = {
  task: string;
  setTaskList: Dispatch<SetStateAction<Task[]>>;
  readonly id: string;
  checked: boolean;
};

export const TodoItem: VFC<TodoItemProps> = (props) => {
  const [task, setTask] = useState<string>("");

  useEffect(() => {
    setTask(props.task);
  }, [props.task]);

  const getUniqueId = () => {
    return new Date().getTime().toString(36) + "-" + Math.random().toString(36);
  };

  const handleChangeTask = (e: ChangeEvent<HTMLTextAreaElement>) => {
    //taskの中に'\n'が入っているため取り除く処理
    const task = e.target.value.replace("\n", "");
    setTask(task);
  };
  //textareaの高さ自動（WIP）
  // const calcTextAreaHeight = (task: string) => {
  //     const rowsNum: number = task.split('\n').length;
  //     return rowsNum
  //   }

  //最大200文字まで書き込み、それ以上は入力文字数制限
  const handleCountChange = (e: any) => {
    const truncate = (str: string, length: number) => {
      return str.length >= length ? alert("入力可能な文字数を超えています。") : str;
    };
    truncate(e.target.value, 200);
  };

  const handleOnKeyDown = useCallback(
    (e: KeyboardEventHandler<HTMLTextAreaElement> | undefined | any) => {
      if (e.key === "Enter") {
        if (!task) return;
        const newId = getUniqueId();
        props.setTaskList((prev) => {
          return [
            {
              id: newId,
              task,
              checked: false,
            },
            ...prev,
          ];
        });
        //初期化することで前の内容のコピーを防ぐ
        setTask("");
      }
      return;
    },
    [task, props]
  );

  //タスクの完了/未完了を操作する関数
  const handleOnCheck = () => {
    props.setTaskList((prevTaskList) => {
      const newTaskList = prevTaskList.map((item: Task) => {
        if (item.id === props.id) {
          return { ...item, checked: !item.checked };
        }
        return { ...item };
      });
      return newTaskList;
    });
  };

  const [isFocused, setIsFocused] = useState<boolean>(false);

  //「タスクを追加する」でクリック（focus）した場合
  const handleOnFocus = () => {
    setIsFocused(!isFocused);
  };

  //入力欄に何も記入していない状態で、欄外をクリック（blur)した場合
  const handleOnBlur = () => {
    setIsFocused(!isFocused);
  };

  return (
    <div className="flex flex-row pb-1 pl-1">
      {/* {task === "" ? <PlusBtn /> : <RadioBtn variant="rose" value="task1" />} */}
      {/* 完了時のボタンとタスク文の横線を連携させるために、入力前の挙動を以下のように変更することが必要だった */}
      {/* focusしたら、ボタン（＋）「タスクを追加する」は消えるようにした。前の方法だと、フォーカスだけでなく、文字をタイプして初めて、
      ボタン（＋）「タスクを追加する」が消えるようになっていた
      ] */}
      {isFocused || task ? (
        <>
          <div className="flex relative justify-center items-center w-6 h-6 rounded-full border-2 border-baseGray-200 border-solid">
            <input
              type="checkbox"
              //タスクの完了/未完了を操作(checkedを使用)
              checked={props.checked} //これが無いと、taskをクリックした際、ボタンが赤くならない
              onClick={handleOnCheck}
              //ボタンの赤色は、擬似クラス（checked:)で制御。textarea同様、三項演算でも設定可能
              className="absolute w-4 h-4 checked:bg-red-500 rounded-full border-baseGray-200 appearance-none cursor-pointer"
            />
          </div>
          <textarea
            // rows={calcTextAreaHeight(task)}
            value={task}
            maxLength={200}
            onKeyUp={handleCountChange}
            onChange={handleChangeTask}
            onKeyDown={handleOnKeyDown}
            //イベントハンドラー（タスクの完了/未完了を操作）
            onClick={handleOnCheck}
            className={`
                  overflow-hidden
                  ml-3
                  focus:outline-none
                  caret-[#F43F5E]
                  resize-none
                  ${
                    //タスクの完了/未完了に合わせ、タスクに横線をつける/消す
                    props.checked === true ? "line-through" : ""
                  }
                  `}
            onBlur={handleOnBlur}
          />
        </>
      ) : (
        <>
          <PlusBtn />
          <textarea
            placeholder="タスクを追加する"
            // rows={calcTextAreaHeight(task)}
            className="
                  focus:outline-none
                  resize-none
            "
            onFocus={handleOnFocus}
          />
        </>
      )}
    </div>
  );
};
