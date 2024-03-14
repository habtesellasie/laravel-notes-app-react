import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import React, { useRef } from 'react';
import InputError from '@/Components/InputError';
import { router } from '@inertiajs/react';

import NProgress from 'nprogress';

router.on('start', () => NProgress.start());
router.on('finish', () => NProgress.done());

const Create = ({ auth }) => {
  const noteTitleRef = useRef();
  const noteRef = useRef();

  const { data, setData, errors, post, reset, processing } = useForm({
    note_title: '',
    note: '',
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('note.store'), {
      preserveScroll: true,
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
          Create New Note
        </h2>
      }
    >
      <div className='note-container single-note'>
        <form onSubmit={submit} className='mt-10'>
          {/* @csrf */}

          <input
            placeholder='Enter your title note here'
            type='text'
            name='note_title'
            className='w-full bg-[#f4ce44] border-none mb-4 rounded-sm font-bold'
            ref={noteTitleRef}
            value={data.note_title}
            onChange={(e) => setData('note_title', e.target.value)}
          />
          <textarea
            ref={noteRef}
            name='note'
            rows='10'
            className='note-body note'
            onChange={(e) => setData('note', e.target.value)}
            placeholder='Enter your note here'
          ></textarea>
          <div className='note-buttons'>
            <NavLink href={route('note.index')} className='note-cancel-button'>
              Cancel
            </NavLink>
            <button className='note-submit-button'>Submit</button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;
