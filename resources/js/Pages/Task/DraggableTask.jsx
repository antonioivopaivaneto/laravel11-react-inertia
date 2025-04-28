import { Draggable } from "react-beautiful-dnd";

const DraggableTask = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="task-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="px-3 py-2 text-white">{task.name}</div>
          <div className="text-sm text-gray-500">{task.due_date}</div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableTask;
