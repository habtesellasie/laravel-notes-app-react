<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = Note::query()
            ->where('user_id', request()->user()->id)
            ->orderBy('created_at', 'desc')->paginate(6);

        // return Inertia::render('Note/Index', [
        //     'notes' => $notes
        // ]);
        return inertia('Note/Index', [
            'notes' => $notes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Note/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // ddd($request);
        $data = $request->validate([
            'note_title' => 'required',
            'note' => 'required|min:5'
        ]);
        $data['user_id'] = $request->user()->id;

        $note = Note::create($data);

        // return Inertia::render('Note/Index', [
        //     // 'note' => $note
        // ]);

        return to_route('note.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {

        if ($note->user_id !== request()->user()->id) {
            return inertia('NotFound');
            abort(403);
        }

        return Inertia::render('Note/Show', [
            'note' => $note
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Note $note)
    {
        if ($note->user_id !== request()->user()->id) {
            abort(403);
            return inertia('NotFound');
        }
        return Inertia::render('Note/Edit', [
            'note' => $note
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        if ($note->user_id !== request()->user()->id) {
            abort(403);
            return inertia('NotFound');
        }

        $data = $request->validate([
            'note_title' => 'required',
            'note' => 'required|min:5'
        ]);
        // $data['user_id'] = $request->user()->id;

        $note->update($data);

        $note = Note::find($note->id);

        // return Inertia::render('Note/Show', [
        //     'note' => $note
        // ]);

        return to_route('note.show', [

            'note' => $note
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        if ($note->user_id !== request()->user()->id) {
            abort(403);
            return inertia('NotFound');
        }

        $note->delete();
        // return Inertia::render('Note/Index');
        return to_route('note.index');
    }
}
