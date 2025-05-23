<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskCrudResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $query = Task::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        // Condição para tarefas criadas pelo usuário atual
        $query->where('created_by', $user->id);

        // Condição para tarefas onde o usuário atual está atribuído
        $query->orWhere('assigned_user_id', $user->id);



        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }


        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null ,
            'success' => session('success')

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $projects = Project::query()
            ->where('created_by', $user->id)
            ->orWhereHas('users', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->orderBy('name', 'asc')
            ->get();


        $users = User::query()->orderBy('name', 'asc')->get();

        return Inertia('Task/Create', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
        ]);
    }

    public function createWithProjectPage($id)
    {
        $user = Auth::user();
        $project = Project::find($id);




    $createdByUserId = $project->created_by;

    // Recupera os IDs dos usuários associados ao projeto através da tabela pivot project_user
    $associatedUserIds = $project->users()->pluck('user_id')->toArray();

    // Inclui o ID do criador na lista de IDs dos usuários associados
    $userIds = array_unique(array_merge([$createdByUserId], $associatedUserIds));

    // Recupera os usuários a partir dos IDs obtidos
    $users = User::whereIn('id', $userIds)->get();

        return Inertia('Task/CreateWithProject', [
            'project' => $project,
            'users' => UserResource::collection($users),
            'success' => session('success')

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();


        if ($image) {
            $data['image_path'] =  $image->store('task/' . Str::random(), 'public');
        }


        Task::create($data);

        return to_route('task.index')->with('success', 'Tarefa Cadastrada');
    }



    public function createWithProject(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        $projectId = $data['project_id'];
        $taskName = $data['name'];



        if ($image) {
            $data['image_path'] =  $image->store('task/' . Str::random(), 'public');
        }


        Task::create($data);

        return to_route('task.createWithProjectPage',['id' => $projectId])->with('success', "Tarefa  \"$taskName  \" Salva com Sucesso");


    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {

        return Inertia('Task/Show', [
            'task' => new TaskResource($task),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {

        $projects = Project::query()->orderBy('name', 'asc')->get();
        $users = User::query()->orderBy('name', 'asc')->get();

        return Inertia('Task/Edit', [
            'projects' => ProjectResource::collection($projects),
            'users' => UserResource::collection($users),
            'task' => new TaskCrudResource($task)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();
        if ($image) {
            if ($task->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($task->image_path));
            }
            $data['image_path'] =  $image->store('task/' . Str::random(), 'public');
        }
        $task->update($data);

        return to_route('task.index')->with('success', "Project \"$task->name \" was updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        if ($task->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($task->image_path));
        }
        $task->delete();

        return to_route('task.index')->with('success', "Project \"$name\" was deleted");
    }

    public function myTasks()
    {
        $user = auth()->user();
        $query = Task::query()->where('assigned_user_id', $user->id);

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");



        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }


        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null
        ]);
    }

    public function getUsersByProject($id)
    {

        // Recupera o projeto pelo ID
        $project = Project::find($id);

        // Verifica se o projeto existe
        if (!$project) {
            return response()->json(['error' => 'Projeto não encontrado'], 404);
        }

        $createdByUserId = $project->created_by;

        // Recupera os IDs dos usuários associados ao projeto através da tabela pivot project_user
        $associatedUserIds = $project->users()->pluck('user_id')->toArray();

        // Inclui o ID do criador na lista de IDs dos usuários associados
        $userIds = array_unique(array_merge([$createdByUserId], $associatedUserIds));

        // Recupera os usuários a partir dos IDs obtidos
        $users = User::whereIn('id', $userIds)->get();

        return response()->json($users);
    }

    public function updateStatus(Request $request, Task $task)
{
    $request->validate([
        'status' => 'required|string|in:pending,in_progress,completed',
    ]);

    $task->status = $request->status;
    $task->save();

    return response()->json(['message' => 'Status atualizado com sucesso']);
}

}
