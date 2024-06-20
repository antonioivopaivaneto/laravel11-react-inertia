
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link,  } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function Index({ auth, success,  tasks, queryParams = null }) {


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl text-gray-100  uppercase ">
          Tarefas
        </h2>
         <Link
         href={route("task.create")}
         className="bg-[#00dae8] py-2 px-12  hover:shadow-glow text-gray-700 font-bold rounded shadow transition-all hover:bg-white"
       >
         {" "}
         Novo
       </Link>
       </div>
      }
    >
      <Head title="tasks" />

      <div className="py-6">
        <div className="">
          <div className="bg-[#111] overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <TasksTable success={success} tasks={tasks} queryParams={queryParams} />


            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
