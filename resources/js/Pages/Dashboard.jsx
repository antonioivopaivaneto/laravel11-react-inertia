import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";

export default function Dashboard({
  auth,
  myPendingTasks,
  totalPendingTasks,
  myProgressTasks,
  totalProgressTasks,
  myCompletedTasks,
  totalCompletedTasks,
  activeTasks
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-5">
        <div className="mx-auto grid grid-cols-3 gap-2">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className="text-amber-500 text-2xl font-semibold">
                Tarefas Pendentes
              </h3>
              <p className="text-xl mt-1">
                <span className="mr-2">{myPendingTasks}</span>/
                <span className="ml-2">{totalPendingTasks}</span>
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className="text-blue-500 text-2xl font-semibold">
                Tarefas Em Progresso
              </h3>
              <p className="text-xl mt-1">
                <span className="mr-2">{myProgressTasks}</span>/
                <span className="ml-2">{totalProgressTasks}</span>
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className="text-green-500 text-2xl font-semibold">
                Tarefas Completadas
              </h3>
              <p className="text-xl mt-1">
                <span className="mr-2">{myCompletedTasks}</span>/
                <span className="ml-2">{totalCompletedTasks}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="py-7">
          <div className="mx-auto  ">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900">
                <h3 className="text-gray-700 text-2xl font-semibold">
                  Minhas Tarefas Ativas
                </h3>

                <table  className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr>
                      <th className="px-3 py-3">ID</th>
                      <th className="px-3 py-3">Project Name</th>
                      <th className="px-3 py-3">Name</th>
                      <th className="px-3 py-3">Status</th>
                      <th className="px-3 py-3">Prazo</th>
                    </tr>
                    </thead>
                    <tbody>
                     {activeTasks.data.map(task => (
                      <tr key={task.id}>
                        <td className="px-3 py-2">{task.id}</td>
                        <td className="px-3 py-2 hover:underline">
                          <Link href={route('project.show',task.project.id)}>
                          {task.project.name}
                          </Link>

                          </td>
                          <td className="px-3 py-2 hover:underline">
                          <Link href={route('task.show',task.id)}>
                          {task.name}
                          </Link>

                          </td>
                        <td className="px-3 py-2">
                        <span
                            className={
                              "px-2 py-1 rounded text-nowrap text-white" +
                              TASK_STATUS_CLASS_MAP[task.status]
                            }
                          >
                            {TASK_STATUS_TEXT_MAP[task.status]}
                          </span>
                          </td>
                        <td className="px-3 py-2">{task.due_date}</td>

                      </tr>
                     ))}

                    </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
