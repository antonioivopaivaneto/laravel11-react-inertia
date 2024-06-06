import TableHeading from "@/Components/TableHeading";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Link, router } from "@inertiajs/react";
import IconEdit from "@/Components/IconEdit";
import IconTrash from "@/Components/IconTrash";

export default function TasksTable({
  tasks,
  success,
  queryParams = null,
  hideProjectColumn = false,
}) {
  queryParams = queryParams || {};

  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("task.index"), queryParams);
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

    router.get(route("task.index"), queryParams);
  };

  const deleteTask = (task) => {
    if (!window.confirm("Deseja Remover ?")) {
      return;
    }

    router.delete(route("task.destroy", task.id));
  };

  return (
    <>
      {success && (
        <div className="bg-emerald-500 py-2 px-4 mb-4 text-white rounded">
          {success}
        </div>
      )}

      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-3">Filtros</th>
              <th className="px-3 py-3"></th>
              <th className="px-3 py-3">
                <TextInput
                  defaultValue={queryParams.name}
                  className="w-full text-xs "
                  placeholder="Nome da Tarefa"
                  onBlur={(e) => searchFieldChange("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              <th className="px-3 py-3">
                <SelectInput
                  defaultValue={queryParams.status}
                  className="w-full text-xs"
                  onChange={(e) => searchFieldChange("status", e.target.value)}
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
              {!hideProjectColumn && <th className="px-3 py-3"></th>}
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHeading
                name="id"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChange}
              >
                ID
              </TableHeading>

              <th className="px-3 py-3">Imagem</th>
              {!hideProjectColumn && (
                <th className="px-3 py-3">Nome</th>
              )}
              <TableHeading
                name="Name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChange}
              >
                Nome
              </TableHeading>
              <TableHeading
                name="Status"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChange}
              >
                Status
              </TableHeading>
              <TableHeading
                name="create_date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChange}
              >
                Criando em
              </TableHeading>
              <TableHeading
                name="due_date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChange}
              >
                Prazo
              </TableHeading>
              <th
                onClick={(e) => sortChange("createdBy")}
                className="px-3 py-3"
              >
                Criado Por
              </th>
              <th className="px-3 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tasks.data.map((task) => (
              <tr className="bg-white border-b " key={task.id}>
                <th className="px-3 py-2">{task.id}</th>

                <td className="px-3 py-2">
                  <img src={task.image_path} alt="" style={{ width: 60 }} />
                </td>
                {!hideProjectColumn && (
                  <td className="px-3 py-2">{task.project.name}</td>
                )}

                <td className="px-3 py-2 text-gray-500   hover:underline">
                  <Link href={route("task.show", task.id)}>{task.name}</Link>
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
                <td className="px-3 py-2">{task.created_at}</td>
                <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                <td className="px-3 py-2">{task.createdBy.name}</td>
                <td className="px-3 py-2 text-nowrap flex gap-3">
                  <Link
                    href={route("task.edit", task.id)}
                    className="font-medium text-blue-600 hover:underline mx-1"
                  >
                    <IconEdit />
                  </Link>
                  <button
                    onClick={(e) => deleteTask(task)}
                    className="font-medium text-red-600 hover:underline mx-1"
                  >
                    <IconTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination links={tasks.meta.links}></Pagination>
    </>
  );
}
