import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Create({ auth, project, users,success }) {

  const { data, setData, post, errors, reset } = useForm({
    project_id: project.id,
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });
  useEffect(() => {
    if (success) {
     reset();
    }
  }, [success]);

  const [filteredUsers, setFilteredUsers] = useState([]);

  const onSubmit  = async (e) => {
    e.preventDefault();

   await post(route("task.createWithProject"));


  };





  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl text-gray-100  uppercase ">
          Nova Tarefa para : {project.name}
          </h2>
        </div>
      }
    >
      <Head title="Tasks"  />

      {success && (
        <div className="bg-emerald-500 py-2 px-4 mt-2 text-white rounded ">
          {success}
        </div>
      )}

      <div className="py-6">
        <div className=" mx-auto ">
          <div className="bg-[#111] overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-[#111] shadow sm:rounded-lg"
            >
              <div className="mt-4 hidden">
                <InputLabel htmlFor="task_project_id" value="Projeto" />

                <TextInput
                  id="task_project_id"
                  type="text"
                  name="project_id"
                  value={project.name}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("project_id",project.id)}
                />

                <InputError message={errors.project_id} className="mt-2" />
              </div>


              <div className="mt-4">
                <InputLabel htmlFor="task_name" value="Nome da Tarefa" />
                <TextInput
                  id="task_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_description" value="Descrição" />
                <TextAreaInput
                  id="task_description"
                  type="text"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>



              <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Status" />
                <SelectInput
                  id="task_status"
                  name="status"
                  value={data.status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pendente</option>
                  <option value="in_progress">Em Progresso</option>
                  <option value="completed">Concluido</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_priority" value="Prioridade" />
                <SelectInput
                  id="task_priority"
                  name="priority"
                  value={data.priority}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="">Selecione Prioridade</option>
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </SelectInput>
                <InputError message={errors.priority} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_assigned_user" value="Responsavel" />
                <SelectInput
                  id="task_assigned_user"
                  name="assigned_user_id"
                  value={data.assigned_user_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >

                  <option value="">Selecione Responsável </option>
                  {users.data.map((user) => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </SelectInput>
                <InputError
                  message={errors.assigned_user_id}
                  className="mt-2"
                />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_image_path" value="Imagem" />
                <TextInput
                  id="task_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full text-white"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="task_due_date" value="Prazo" />
                <TextInput
                  id="task_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block "
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>

              <div className="mt-4 text-right">
                <Link
                  href={route("task.index")}
                  className="bg-gray-100 py-3 px-5 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 text-sm h-8"
                >
                  Cancelar
                </Link>
                <button className="bg-[#00dae8] py-2 px-12  hover:shadow-glow text-gray-700 font-bold rounded shadow transition-all hover:bg-white">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
