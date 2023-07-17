"use client";

import { useBoardStore } from "@/store/BoardStore";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard: React.FC<Props> = ({
  id,
  todo,
  index,
  innerRef,
  dragHandleProps,
  draggableProps,
}) => {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      className="bg-gray-800 text-white rounded-md space-y-2 drop-shadow-md border border-gray-700"
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button className="text-gray-200 opacity-40 hover:opacity-100">
          <XCircleIcon
            onClick={() => deleteTask(index, todo, id)}
            className="ml-5 h-8 w-8"
          />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
