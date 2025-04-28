import { Droppable, Draggable } from "react-beautiful-dnd";

export default function TaskColumn({ columnId, tasks, title }) {
  return (
    <div className="w-1/3 p-2">
      <h2 className="font-bold text-2xl mb-4 text-[#00dae8]">{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="bg-gray-200 rounded p-4"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white rounded p-4 mb-2 shadow-md"
                  >
                    <h3 className="font-bold">{task.name}</h3>
                    <p>{task.description}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
