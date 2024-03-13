import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React from 'react';

const Show = ({ auth, note }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          {note.note_title}
        </h2>
      }
    >
      <div className='note-container single-note my-60'>
        <div className='note-header'>
          <div>
            <a
              href="{{ route('note.index') }}"
              className='note-edit-button mt-12 text-blue-400 p-4 flex items-center justify-center text-nowrap gap-2'
            >
              <div className='text-blue-400'>
                <svg
                  version='1.1'
                  id='Capa_1'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  viewBox='0 0 400.004 400.004'
                  xmlSpace='preserve'
                  width={10}
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></g>
                  <g id='SVGRepo_iconCarrier'>
                    {' '}
                    <g>
                      {' '}
                      <path d='M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757 c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072 c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315 C400.004,190.438,392.251,182.686,382.688,182.686z'></path>{' '}
                    </g>{' '}
                  </g>
                </svg>{' '}
              </div>
              Go back
            </a>
          </div>
          <h1 className='text-xl py-4 text-black'>Note: {note.created_at}</h1>
          <div className='note-buttons'>
            <a
              href="{{ route('note.edit', $note) }}"
              className='note-edit-button'
            >
              Edit
            </a>
            <form action="{{ route('note.destroy', $note) }}" method='POST'>
              {/* @csrf */}
              {/* @method('DELETE') */}
              <button className='note-delete-button'>Delete</button>
            </form>
          </div>
        </div>
        <div className='note'>
          <div className='note-body'>{note.note}</div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
