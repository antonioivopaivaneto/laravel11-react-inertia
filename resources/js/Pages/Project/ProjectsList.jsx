import { Link } from "@inertiajs/react";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import IconEdit from "@/Components/IconEdit";
import IconTrash from "@/Components/IconTrash";
import Pagination from "@/Components/Pagination";

export default function ProjectsList({ projects }) {
  return (
    <div className="p-4">
      {projects.data.map((project) => (
        <div
          key={project.id}
          className="px-5 py-4 rounded-xl bg-[#111] text-white flex flex-col md:flex-row items-center mt-2 justify-between hover:bg-[#333]"
        >
          <div className="w-full md:w-auto px-3 py-2 text-white flex justify-between md:block">
            <span>{project.id}</span>
          </div>
          <div className="w-full md:w-auto px-3 py-2 flex justify-center md:block">
            <a href={project.image_path} target="&_blank">
              <img
                src={project.image_path}
                alt=""
                style={{ width: 60 }}
                className="object-cover h-16 cursor-pointer"
              />
            </a>
          </div>
          <div className="w-full md:w-auto px-3 py-2 text-white hover:underline text-center md:text-left">
            <Link href={route("project.show", project.id)}>{project.name}</Link>
          </div>
          <div className="w-full md:w-auto px-3 py-2 text-center md:text-left">
            <span
              className={
                "px-2 py-1 rounded text-white " +
                PROJECT_STATUS_CLASS_MAP[project.status]
              }
            >
              {PROJECT_STATUS_TEXT_MAP[project.status]}
            </span>
          </div>
          <div className="w-full md:w-auto px-3 py-2 text-center md:text-left">
            {project.created_at}
          </div>
          <div className="w-full md:w-auto px-3 py-2 text-center md:text-left">
            {project.due_date}
          </div>
          <div className="w-full md:w-auto px-3 py-2 text-center md:text-left">
            {project.createdBy.name}
          </div>
          <div className="w-full md:w-auto px-3 py-2 flex justify-center md:justify-start gap-3">
            <Link
              href={route("project.edit", project.id)}
              className="font-medium text-blue-600 hover:underline mx-1"
            >
              <IconEdit />
            </Link>
            <button
              onClick={(e) => deleteProject(project)}
              className="font-medium text-red-600 hover:underline mx-1"
            >
              <IconTrash />
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}
