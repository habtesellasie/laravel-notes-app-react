import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { router, Link } from '@inertiajs/react';
import NProgress from 'nprogress';

router.on('start', () => NProgress.start());
router.on('finish', () => NProgress.done());

const Index = ({ auth, notes }) => {
  const deleteNote = (note) => {
    if (confirm('Are you sure you want to delete this note?')) {
      router.delete(route('note.destroy', note.id));
    }
  };

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
        <NavLink href={route('note.create')} className='new-note-btn'>
          +
        </NavLink>
        <div className='notes'>
          {notes.data.map((note) => {
            return (
              <div className='note' key={note.note_title}>
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

                  {/* <form onSubmit={(e) => deleteNote(e, note)} method='POST'> */}
                  {/* @csrf */}
                  {/* @method('DELETE') */}
                  <button
                    className='note-delete-button'
                    onClick={(e) => deleteNote(note)}
                  >
                    Delete
                  </button>
                  {/* </form> */}
                </div>
              </div>
            );
          })}
        </div>

        <div className='p-6'>{/* {{ $notes->links() }} */}</div>
        <nav className='text-center mt-4'>
          {notes.links.map((link) => (
            <Link
              preserveScroll
              href={link.url || ''}
              key={link.label}
              className={
                'inline-block py-2 px-3 rounded-lg text-gray-800 text-xs ' +
                (link.active ? 'bg-yellow-400 ' : ' ') +
                (!link.url
                  ? '!text-gray-800 cursor-not-allowed '
                  : 'hover:bg-yellow-400')
              }
              dangerouslySetInnerHTML={{ __html: link.label }}
            ></Link>
          ))}
        </nav>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
