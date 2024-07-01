<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $users = User::all();
        $query = Project::query();

        $query->orWhere('created_by', $user->id);

        // Junta a tabela project_user para incluir projetos nos quais o usuário está associado
        $query->orWhereHas('users', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        });

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");



        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }







        $project = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);



        return inertia("Project/Index", [
            "projects" => ProjectResource::collection($project),
            "users" => UserResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();


        if ($image) {
            $data['image_path'] =  $image->store('project/' . Str::random(), 'public');
        }


        Project::create($data);

        return to_route('project.index')->with('success', 'Projeto Cadastrado');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {


        $query = $project->tasks();
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");



        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }


        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        $user = Auth::user();
        $users = User::where('id', '!=', $user->id)
            ->where('id', '!=', $project->created_by)
            ->get();

        $projectUsers = $project->users()->get();

        return Inertia('Project/Show', [
            "users" => UserResource::collection($users),
            "projectUsers" => $projectUsers,
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success')

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia('Project/Edit', ['project' => new ProjectResource($project)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($project->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($project->image_path));
            }
            $data['image_path'] =  $image->store('project/' . Str::random(), 'public');
        }
        $project->update($data);

        return to_route('project.index')->with('success', "Project \"$project->name \" was updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        if ($project->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($project->image_path));
        }
        $project->delete();

        return to_route('project.index')->with('success', "Project \"$name\" was deleted");
    }

    public function AddUserInProject(Request $request)
    {
        // Obtenha os parâmetros do array
        $parameters = $request->all();

        // Verifique se o array de usuários está vazio
        if (empty($parameters['users'])) {
            // Se estiver vazio, remova todos os usuários associados a este projeto
            DB::table('project_user')
                ->where('project_id', $parameters['project_id'])
                ->delete();

            return redirect()->back();
        }

        // Itere sobre cada conjunto de parâmetros
        foreach ($parameters['users'] as $userId) {
            // Verifique se já existe uma entrada na tabela project_user
            $existingEntry = DB::table('project_user')
                ->where('user_id', $userId)
                ->where('project_id', $parameters['project_id'])
                ->first();

            // Se já existir uma entrada, exclua-a
            if ($existingEntry) {
                DB::table('project_user')
                    ->where('user_id', $userId)
                    ->where('project_id', $parameters['project_id'])
                    ->delete();
            } else {
                // Caso contrário, insira uma nova entrada na tabela project_user
                DB::table('project_user')->insert([
                    'project_id' => $parameters['project_id'],
                    'user_id' => $userId
                ]);
            }
        }

        return redirect()->back();
    }

}
