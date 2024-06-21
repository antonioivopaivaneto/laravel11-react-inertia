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
        <h2 className="font-semibold text-3xl text-gray-100 uppercase leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-5">
        <div className="mx-auto grid grid-cols-3 gap-2">
          <div className="bg-[#111] overflow-hidden shadow-sm sm:rounded-lg">
            <div className="md:p-6 p-2 text-gray-900">
              <h3 className="text-amber-500 md:text-2xl sm:text-lg  font-semibold">
                 Pendentes
              </h3>
              <p className="md:text-xl sm:text-sm mt-1">
                <span className="mr-2 text-white  ">{myPendingTasks} / {totalPendingTasks}</span>
              </p>
            </div>
          </div>

          <div className="bg-[#111] overflow-hidden shadow-sm sm:rounded-lg">
            <div className="md:p-6 p-2 text-gray-900">
              <h3 className="text-blue-500 md:text-2xl sm:text-lg  font-semibold text-nowrap">
                 Em Progresso
              </h3>
              <p className="md:text-xl sm:text-sm mt-1">
                <span className="mr-2 text-white ">{myProgressTasks} / {totalProgressTasks}</span>
              </p>
            </div>
          </div>

          <div className="bg-[#111] overflow-hidden shadow-sm sm:rounded-lg">
            <div className="md:p-6 p-2 text-gray-900">
              <h3 className="text-green-500 md:text-2xl sm:text-lg  font-semibold">
                 Completadas
              </h3>
              <p className="md:text-xl sm:text-sm mt-1">
                <span className="mr-2 text-white ">{myCompletedTasks} / {totalCompletedTasks}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="py-7">
          <div className="mx-auto  ">
            <div className="bg-[#111] dark:bg-[#111]  overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900">
                <h3 className="text-white text-2xl font-semibold">
                  Minhas Tarefas Ativas
                </h3>

                <table  className="mt-3 w-full text-sm text-left rtl:text-right text-white bg-[#111] dark:bg-[#111]">
                  <thead className="text-xs text-white uppercase bg-[#111] dark:bg-[#111] border-b-2 border-gray-500">
                    <tr>
                      <th className="px-3 py-3">ID</th>
                      <th className="px-3 py-3">Projeto</th>
                      <th className="px-3 py-3">Tarefa</th>
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
