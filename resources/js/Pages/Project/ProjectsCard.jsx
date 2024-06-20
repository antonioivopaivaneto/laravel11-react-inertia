import { Link } from "@inertiajs/react";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import IconEdit from "@/Components/IconEdit";
import IconTrash from "@/Components/IconTrash";
import Pagination from "@/Components/Pagination";

export default function ProjectsCard({projects}){
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
      {projects.data.map((project) => (
        <div key={project.id} className="bg-[#111] text-white rounded-xl  shadow-lg hover:bg-[#333] transition-all">
          <div className="mb-3">
            <a href={project.image_path} target="_blank" rel="noopener noreferrer">
              <img src={project.image_path} alt={project.name} className="w-full h-72 object-cover rounded-t-md cursor-pointer" />
            </a>
          </div>
          <div className="p-5">
          <div className="mb-3">
            <Link href={route("project.show", project.id)} className="text-xl font-semibold hover:underline uppercase">
              {project.name}
            </Link>
          </div>
          <div className="mb-3">
            <span className={`px-2 py-1 rounded text-white text-sm ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
              {PROJECT_STATUS_TEXT_MAP[project.status]}
            </span>
          </div>
          <div className="text-sm">Criado em: {project.created_at}</div>
          <div className="text-sm">Prazo: {project.due_date}</div>
          <div className="text-sm">Criado por: {project.createdBy.name}</div>
          <div className="flex justify-between">
          <div className="mt-4">
          <Link
            href={route("project.show", project.id)}
            className="bg-[#00dae8] py-1 px-5  hover:shadow-glow text-gray-700 font-bold rounded shadow transition-all hover:bg-white"
          >
            {" "}
            Acessar
          </Link>
          </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );

}
