import type { ChangeEvent, Dispatch, KeyboardEventHandler, SetStateAction, VFC } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { PlusBtn } from "src/components/btn/PlusBtn";

export type Task = {
  readonly id: string;
  task?: string;
  checked: boolean;
  registered: boolean;
};

type TodoItemProps = {
  task: string;
  setTaskList: Dispatch<SetStateAction<Task[]>>;
  readonly id: string;
  checked: boolean;
  tailChecked: string;
  registered: boolean;
};

export const TodoItem: VFC<TodoItemProps> = (props) => {
  const [task, setTask] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  //全角文字変換前の入力値を保存する
  const [isComposing, setIsComposing] = useState(false);
  // const [textAreaHeight, setTextAreaHeight] = useState()

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

  //最大200文字まで書き込み、それ以上は入力文字数制限
  const handleCountChange = (e: any) => {
    const truncate = (str: string, length: number) => {
      return str.length >= length ? alert("入力可能な文字数を超えています。") : str;
    };
    truncate(e.target.value, 200);
  };

  const handleStartComposition = () => {
    return setIsComposing(true);
  };
  const handleEndComposition = () => {
    return setIsComposing(false);
  };

  const handleOnKeyDown = useCallback(
    (e: KeyboardEventHandler<HTMLTextAreaElement> | undefined | any) => {
      //Enterを押す前、又は全角文字変換前の場合、以下実行しない
      if (e.key !== "Enter" || isComposing) return;
      //全角文字変換完了後Enterすれば、以下実行
      if (!task) return;

      //setTaskListの更新
      if (props.task) {
        props.setTaskList((prevTaskList) => {
          const newTaskList = prevTaskList.map((item: Task) => {
            if (item.id === props.id) {
              return { ...item, task: task };
            }
            return { ...item };
          });
          return newTaskList;
        });
        return;
      }
      if (props.registered) return;

      const newId = getUniqueId();
      props.setTaskList((prev) => {
        return [
          {
            id: newId,
            task,
            checked: false,
            registered: true,
          },
          ...prev,
        ];
      });
      //初期化することで前の内容のコピーを防ぐ
      setTask("");
    },
    [isComposing, props, task]
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

  //「タスクを追加する」でクリック（focus）した場合
  const handleOnFocus = () => {
    setIsFocused(true);
  };

  //入力欄に何も記入していない状態で、欄外をクリック（blur)した場合
  const handleOnBlur = () => {
    setIsFocused(false);
  };

  //「タスクを追加する」でクリック（focus）した場合
  const handleOnButtonFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="flex flex-row pb-1 pl-1">
      {isFocused || task || props.registered ? (
        <div className="flex relative justify-center items-center w-6 h-6 rounded-full border-2 border-baseGray-200 border-solid">
          <input
            type="checkbox"
            //タスクの完了/未完了を操作(checkedを使用)
            checked={props.checked} //これが無いと、taskをクリックした際、ボタンが赤くならない
            onChange={handleOnCheck}
            //時期別コンポーネントで指定された色がpropsとして渡され表示
            className={`absolute w-4 h-4 rounded-full border-baseGray-200 appearance-none cursor-pointer ${props.tailChecked}`}
            onClick={handleOnBlur}
          />
        </div>
      ) : (
        <PlusBtn onClick={handleOnButtonFocus} />
      )}
      <TextareaAutosize
        value={task}
        maxLength={200}
        onKeyUp={handleCountChange}
        onChange={handleChangeTask}
        onKeyDown={handleOnKeyDown}
        //イベントハンドラー（タスクの完了/未完了を操作）
        placeholder={isFocused || props.registered ? "" : "タスクを追加する"}
        // onClick={handleOnCheck}
        //全角文字変換前の入力値を監視する
        onCompositionStart={handleStartComposition}
        onCompositionEnd={handleEndComposition}
        className={`
                  overflow-hidden
                  ml-3
                  focus:outline-none
                  caret-[#F43F5E]
                  resize-none
                  ${
                    //タスクの完了/未完了に合わせ、タスクに横線をつける/消す
                    props.checked === true ? "line-through text-baseGray-200" : ""
                  }
                  `}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </div>
  );
};
