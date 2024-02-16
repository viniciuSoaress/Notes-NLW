'use client'

import { ChangeEvent, useState } from "react";
import { NewNoteCard } from "./new-note-card";
import { NoteCard } from "./note-card";


type Note = {
  id: string,
  date: Date,
  content: string
}


export function Note() {

  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    return []
  })

  function onNoteCreated(content: string) {
    const newNote = {
      date: new Date(),
      content,
      id: crypto.randomUUID()
    }

    const notesArray = [
      newNote,
      ...notes,
    ]
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value

    setSearch(query)
  }

  const filterSearchNotes = search !== ''
    ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    : notes

  return (
    <div className="flex flex-col gap-6">

      <form className="w-full ">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          onChange={handleSearchChange}
          className="bg-transparent outline-none w-full text-3xl font-semibold tracking-tight placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">

        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filterSearchNotes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}