import { Link } from "@inertiajs/react";

export default function Pagination({links}){
return(
  <nav className="text-center mt-4">
    {links.map(link =>(
      <Link
      preserveScroll
      href={link.url || ""}
      key={link.label}
      className={"inline-block py-2 px-3 rounded-lg text-gray-300 text-xs hover:text-gray-600  " + (link.active ? "bg-gray-200  " :" ") + (link.url ? "text-gray-500 hover:bg-gray-200 ": "cursor-not-allowed text-gray-200  hover:text-gray-200")}
      dangerouslySetInnerHTML={{ __html: link.label }}>

      </Link>
    ))}
  </nav>
)
}
