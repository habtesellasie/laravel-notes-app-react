import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
// import { route } from 'ziggy-js';

const Index = ({ auth, notes }) => {
  console.log(notes);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          Notes
        </h2>
      }
    >
      <Head title='Notes' />
      <div className='note-container py-12'>
        <a href="{{ route('note.create') }}" className='new-note-btn'>
          +
        </a>
        <Link href={route('note.create')}>+</Link>
        <div className='notes'>
          {notes.data.map((note) => {
            return (
              <div className='note'>
                <div className='note-body'>
                  {/* {{ Str::words($note->note, 30) }} */}
                  <h2 className='underline font-bold'>{note.note_title}</h2>
                  <p className='mt-4'>{note.note}</p>
                </div>
                <div className='note-buttons'>
                  <NavLink
                    href={route('note.show', { note: note })}
                    // href={route('Note.Show', { note: note })}
                    className='note-edit-button'
                  >
                    View
                  </NavLink>
                  <NavLink
                    href={route('note.edit', { note: note })}
                    className='note-edit-button'
                  >
                    Edit
                  </NavLink>
                  <form
                    action="{{ route('note.destroy', $note) }}"
                    method='POST'
                  >
                    {/* @csrf */}
                    {/* @method('DELETE') */}
                    <button className='note-delete-button'>Delete</button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>

        <div className='p-6'>{/* {{ $notes->links() }} */}</div>
        <div className='p-6'>{notes.data.links}</div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
