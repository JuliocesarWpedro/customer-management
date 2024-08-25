<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
class ClientController extends Controller
{
   public function index(Request $request)
{
    $searchTerm = $request->input('search', '');

    $clientsQuery = Client::query();

    if ($searchTerm) {
        $clientsQuery->where('name', 'like', '%' . $searchTerm . '%');
    }

    $clients = $clientsQuery->paginate(5); 

    return Inertia::render('Clients/ManageClients', [
        'clients' => $clients,
        'searchTerm' => $searchTerm, 
    ]);
}


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:clients',
            'cpf' => 'required|string|max:14|unique:clients',
        ]);

        Client::create($request->all());

        return redirect()->route('clients.index');
    }

   public function update(Request $request, Client $client)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:clients,email,' . $client->id,
        'cpf' => 'required|string|max:14|unique:clients,cpf,' . $client->id,
    ]);

    $client->update($request->all());

}

    public function destroy(Client $client)
    {
        $client->delete();

        return redirect()->route('clients.index');
    }
    public function show($id)
{
    $client = Client::findOrFail($id); 
    $clients = Client::all();

    return Inertia::render('ClientDetail', [
        'client' => $client,
        'clients' => $clients,
    ]);
}

}
