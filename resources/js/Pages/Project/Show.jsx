import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import TasksTable from "../Task/TasksTable";
import React, { useEffect, useState } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();



export default function Show({ auth, project, tasks, queryParams, users, projectUsers }) {


  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Mapeie os usuários para o formato de opções esperado pelo Select
    const mappedOptions = users.data.map((user) => ({
      value: user.id,
      label: user.name,
    }));
    // Defina as opções atualizadas
    setOptions(mappedOptions);
  }, [users]);

  const setUsers = (selectedOptions) => {
   // Obtenha apenas os valores dos usuários selecionados
   const selectedUsers = selectedOptions.map((option) => option.value);

   // Construa um objeto contendo os dados dos usuários e o ID do projeto
   const usersWithProjectId = {
     users: selectedUsers,
     project_id: project.id,
   };

    router.post(route("userAddProject"), usersWithProjectId);
  };





  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl text-gray-100  uppercase ">
          {`Projeto "${project.name}"`}
          </h2>
          <Link
            href={route("project.edit", project.id)}
             className="bg-[#00dae8] py-2 px-12  hover:shadow-glow text-gray-700 font-bold rounded shadow transition-all hover:bg-white"
          >
            {" "}
            Editar
          </Link>
        </div>
      }
    >
      <Head title={`Project "${project.name}"`} />


      <div className="py-6">
        <div className=" mx-auto ">
          <div className="bg-[#111] text-white overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                src={project.image_path}
                alt=""
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 text-gray-900">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <label className="font-bold text-lg text-white">ID</label>
                  <p className="mt-1 text-white">{project.id}</p>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">Nome</label>
                    <p className="mt-1 text-white">{project.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">Status</label>
                    <p className="mt-1 text-white">
                      <span
                        className={
                          "px-2 py-1 rounded text-white" +
                          PROJECT_STATUS_CLASS_MAP[project.status]
                        }
                      >
                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">Criado Por</label>
                    <p className="mt-1 text-white">{project.createdBy.name}</p>
                  </div>
                </div>

                <div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">Prazo</label>
                    <p className="mt-1 text-white">{project.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">Criando em</label>
                    <p className="mt-1 text-white">{project.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">Atualizado Por</label>
                    <p className="mt-1 text-white">{project.updatedBy.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg text-white">Acesso</label>
                    <p className="mt-1 text-white">
                      <Select
                      placeholder="Selecione"
                      className="text-gray-700"
                       isDisabled={project.createdBy.id !== auth.user.id}
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        defaultValue={projectUsers.map(user => ({ value : user.id, label: user.name}))}
                        isMulti
                        options={options}
                        onChange={setUsers}
                      />
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="font-bold text-lg text-white ">
                  Descrição do Projeto
                </label>
                <p className="mt-1 text-white">{project.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-12">
        <div className="">
          <div className="bg-[#111] overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
            <div className=" mb-5">
            <Link
            href={route("task.createWithProjectPage", project.id)}
            className="bg-[#00dae8] py-2 px-12  hover:shadow-glow text-gray-700 font-bold rounded shadow transition-all hover:bg-white"
          >
            {" "}
            Nova Tarefa
          </Link>
            </div>
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                hideProjectColumn={true}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
