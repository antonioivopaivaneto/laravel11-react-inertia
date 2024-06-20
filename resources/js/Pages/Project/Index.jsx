import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import ProjectsList from "./ProjectsList";
import ProjectsCard from "./ProjectsCard";

export default function Index({ auth, projects, queryParams = null, success }) {
  queryParams = queryParams || {};

  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("project.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChange(name, e.target.value);
  };

  const sortChange = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction == "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction == "asc";
    }

    router.get(route("project.index"), queryParams);
  };

  const deleteProject = (project) => {
    if (!window.confirm("Deseja Remover ?")) {
      return;
    }

    router.delete(route("project.destroy", project.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl text-gray-100  uppercase ">
            Projetos
          </h2>
          <Link
            href={route("project.create")}
            className="bg-[#00dae8] py-2 px-12  hover:shadow-glow text-gray-700 font-bold rounded shadow transition-all hover:bg-white"
          >
            {" "}
            Novo
          </Link>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-6">
      <div className=" mx-auto ">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 mb-4 text-white rounded">
              {success}
            </div>
          )}

<div className="py-6">
        <div className="">
          <div className="bg-[#111] overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-[#111] border-b-2 border-gray-500">
                    <tr className="text-nowrap ">
                      <th className=" py-3 text-white">Filtros</th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3 ">
                        <TextInput
                          defaultValue={queryParams.name}
                          className="w-full text-xs"
                          placeholder="Nome do Projeto"
                          onBlur={(e) =>
                            searchFieldChange("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3 ">
                        <SelectInput
                          defaultValue={queryParams.status}
                          className="w-full text-xs"
                          onChange={(e) =>
                            searchFieldChange("status", e.target.value)
                          }
                        >
                          <option value="">Selecione um Status</option>
                          <option value="pending">Pendente</option>
                          <option value="in_progress">Em Progresso</option>
                          <option value="completed">Concluido</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>


                </table>
                <div className=" rounded-xl  bg-[#111]  text-white flex  items-center mt-2 gap-24">
          <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChange}
                      >
                        ID
                      </TableHeading>

                      <TableHeading
                        name="Name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChange}
                      >
                        Capa
                      </TableHeading>
                      <TableHeading
                        name="Status"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChange}
                      >
                        Nome
                      </TableHeading>
                      <TableHeading
                        name="create_date"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChange}
                      >
                        Status
                      </TableHeading>
                      <TableHeading
                        name="due_date"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChange}
                      >
                        Criado em
                      </TableHeading>
                      <th
                        onClick={(e) => sortChange("createdBy")}
                        className="px-3 py-3"
                      >
                        Prazo
                      </th>
                      <th
                        onClick={(e) => sortChange("createdBy")}
                        className="px-3 py-3"
                      >
                        Criado Por
                      </th>
                      <th className="px-7 py-3 ">Ações</th>
          </div>
              </div>
            </div>
          </div>

          <ProjectsCard projects={projects} />



        </div>
      </div>
      </div>
    </AuthenticatedLayout>
  );
}
