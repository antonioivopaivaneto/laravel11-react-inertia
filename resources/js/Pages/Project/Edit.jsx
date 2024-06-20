import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ auth, project }) {
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: project.name || "",
    status: project.status || "",
    description: project.description || "",
    due_date: project.due_date || "",
    _method:'PUT'
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("project.update",project.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl text-gray-100  uppercase ">
          Projeto {project.name}
          </h2>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-6">
        <div className=" mx-auto">
          <div className="bg-[#111] overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 text-white  shadow sm:rounded-lg"
            >

              {project.image_path &&
              <div className="mb-4">
                <img src={project.image_path} alt="" className="w-64" />
              </div> }

              <div>
                <InputLabel
                  htmlFor="project_image_path"
                  value="Capa do Projeto"
                />
                <TextInput
                  id="project_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full text-white   "
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="project_name"
                  value="Nome do Projeto"
                />
                <TextInput
                  id="project_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full "
                  isFocused={true}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="project_description"
                  value="Descrição do Projeto"
                />
                <TextAreaInput
                  id="project_description"
                  type="text"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="project_due_date"
                  value="Deadline do Projeto"
                />
                <TextInput
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel
                  htmlFor="project_status"
                  value="Status do Projeto"
                />
                <SelectInput
                  id="project_status"
                  name="status"
                  value={data.status}
                  className="mt-1 block w-full "
                  isFocused={true}
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pendente</option>
                  <option value="in_progress">Em Progresso</option>
                  <option value="completed">Concluido</option>

                  </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link href={route("project.index")} className="bg-gray-100 py-3 px-5 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 text-sm h-8">Cancelar</Link>
              <button  className="bg-[#00dae8] py-2 px-12  hover:shadow-glow text-gray-700 font-bold rounded shadow transition-all hover:bg-white"
              >
                Atualizar
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
