import TableHeading from "@/Components/TableHeading";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import {
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import {  Link, router } from "@inertiajs/react";

export default function TasksTable({tasks,queryParams = null, hideProjectColumn = false}){
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

  return (
    <>
    <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3">Filtros</th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          defaultValue={queryParams.name}
                          className="w-full"
                          placeholder="task Name"
                          onBlur={(e) =>
                            searchFieldChange("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <SelectInput
                          defaultValue={queryParams.status}
                          className="w-full"
                          onChange={(e) =>
                            searchFieldChange("status", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pendente</option>
                          <option value="in_progress">Em Progresso</option>
                          <option value="completed">Concluido</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      { ! hideProjectColumn && (<th className="px-3 py-3"></th>)}
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                    <TableHeading name="id"  sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChange}>
                      ID
                      </TableHeading>

                      <th className="px-3 py-3">Image</th>
                      {!hideProjectColumn && (<th className="px-3 py-3">Project Name</th>)}
                      <TableHeading name="Name"  sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChange}>
                      Name
                      </TableHeading>
                      <TableHeading name="Status"  sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChange}>
                      Status
                      </TableHeading>
                      <TableHeading name="create_date"  sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChange}>
                      create Date
                      </TableHeading>
                      <TableHeading name="due_date"  sort_field={queryParams.sort_field} sort_direction={queryParams.sort_direction} sortChanged={sortChange}>
                      Due Date
                      </TableHeading>
                      <th
                        onClick={(e) => sortChange("createdBy")}
                        className="px-3 py-3"
                      >
                        Created by
                      </th>
                      <th className="px-3 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.data.map((task) => (
                      <tr className="bg-white border-b " key={task.id}>
                        <th className="px-3 py-2">{task.id}</th>
                        <td className="px-3 py-2">
                          <img
                            src={task.image_path}
                            alt=""
                            style={{ width: 60 }}
                          />
                        </td>
                        {!hideProjectColumn && (<td className="px-3 py-2">{task.project.name}</td>)}
                        <td className="px-3 py-2">{task.name}</td>
                        <td className="px-3 py-2">
                          <span
                            className={
                              "px-2 py-1 rounded text-white" +
                              TASK_STATUS_CLASS_MAP[task.status]
                            }
                          >
                            {TASK_STATUS_TEXT_MAP[task.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2">{task.created_at}</td>
                        <td className="px-3 py-2 text-nowrap">
                          {task.due_date}
                        </td>
                        <td className="px-3 py-2">{task.createdBy.name}</td>
                        <td className="px-3 py-2 text-right">
                          <Link
                            href={route("task.edit", task.id)}
                            className="font-medium text-blue-600 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <Link
                            href={route("task.destroy", task.id)}
                            className="font-medium text-red-600 hover:underline mx-1"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination links={tasks.meta.links}></Pagination></>
  )
}