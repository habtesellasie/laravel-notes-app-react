import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import React, { useRef } from 'react';
import InputError from '@/Components/InputError';

import NProgress from 'nprogress';
import { router } from '@inertiajs/react';

router.on('start', () => NProgress.start());
router.on('finish', () => NProgress.done());

const Edit = ({ auth, note }) => {
  const noteTitleRef = useRef();
  const noteRef = useRef();

  const {
    data = { note_title: note.note_title, note: note.note },
    setData,
    errors,
    put,
    reset,
    processing,
  } = useForm({
    note_title: note.note_title,
    note: note.note,
  });

  const submit = (e) => {
    e.preventDefault();

    put(route('note.update', note.id), {
      preserveScroll: false,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.note_title) {
          noteTitleRef.current.focus();
        }

        if (errors.note) {
          noteRef.current.focus();
        }
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          Edit Note
        </h2>
      }
    >
      <div className='note-container single-note'>
        <form onSubmit={submit} className='note mt-10'>
          {/* @csrf */}

          <input
            placeholder='Enter your title note here'
            type='text'
            name='note_title'
            className=''
            ref={noteTitleRef}
            defaultValue={note.note_title}
            onChange={(e) => setData('note_title', e.target.value)}
          />
          <textarea
            ref={noteRef}
            name='note'
            rows='10'
            className='note-body'
            defaultValue={note.note}
            onChange={(e) => setData('note', e.target.value)}
            placeholder='Enter your note here'
          />
          <div className='note-buttons'>
            <NavLink href={route('note.index')} className='note-cancel-button'>
              Cancel
            </NavLink>
            <button className='note-submit-button'>Update</button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
