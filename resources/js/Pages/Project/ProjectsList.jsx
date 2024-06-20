import { Link } from "@inertiajs/react";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import IconEdit from "@/Components/IconEdit";
import IconTrash from "@/Components/IconTrash";
import Pagination from "@/Components/Pagination";

export default function ProjectsList({projects}){
return (
  <div className="">
            {projects.data.map((project) => (
              <div className=" px-5 rounded-xl  bg-[#111]  text-white flex  items-center mt-2 gap-20 hover:bg-[#333]">
                <div className="px-3 py-2 text-white">{project.id}</div>
                <div className="w-16">
                  <a href={project.image_path} target="&_blank">
                  <img src={project.image_path} alt="" style={{ width: 60 }} className="object-cover h-16  cursor-pointer" />
                  </a>
                </div>
                <div className="px-3 py-2 text-white text-nowrap  hover:underline">
                  <Link href={route("project.show", project.id)}>
                    {project.name}
                  </Link>
                </div>
                <div className="px-3 py-2">
                  <span
                    className={
                      "px-2 py-1 rounded text-nowrap text-white" +
                      PROJECT_STATUS_CLASS_MAP[project.status]
                    }
                  >
                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                  </span>
                </div>
                <td className="px-3 py-2">{project.created_at}</td>
                <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                <td className="px-3 py-2 text-nowrap">{project.createdBy.name}</td>
                <td className="px-3 py-2 text-nowrap  flex gap-3 ">
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
                </td>
              </div>
            ))}
          </div>

)
}
