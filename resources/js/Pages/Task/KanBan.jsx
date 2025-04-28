import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";
import { useForm } from "@inertiajs/react";

const getTasksByStatus = (tasks, status) => {
  return tasks.filter((task) => task.status === status);
};


export default function KanBan({ tasks, success }) {
  const {  put } = useForm({})
  const [taskData, setTaskData] = useState({
    pending: getTasksByStatus(tasks.data, "pending"),
    in_progress: getTasksByStatus(tasks.data, "in_progress"),
    completed: getTasksByStatus(tasks.data, "completed"),
  });



  const updateTaskStatus = async (taskId, newStatus) => {


    try {
      put(route("task.update",taskId));


    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = Array.from(taskData[source.droppableId]);
    const destCol = Array.from(taskData[destination.droppableId]);
    const [movedTask] = sourceCol.splice(source.index, 1);
    movedTask.status = destination.droppableId; // Update status in the task object
    destCol.splice(destination.index, 0, movedTask);

    setTaskData((prevData) => ({
      ...prevData,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    }));

    // Update the status in the backend
    await updateTaskStatus(movedTask.id, destination.droppableId);
  };

  return (
    <>
      {success && (
        <div className="bg-emerald-500 py-2 px-4 mb-4 text-white rounded">
          {success}
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-between">
          <TaskColumn columnId="pending" tasks={taskData.pending} title="Pendente" />
          <TaskColumn columnId="in_progress" tasks={taskData.in_progress} title="Em Progresso" />
          <TaskColumn columnId="completed" tasks={taskData.completed} title="Concluído" />
        </div>
      </DragDropContext>
    </>
  );
}
