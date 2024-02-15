import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";


export default function Home() {
  return (
    <main className="max-w-6xl mx-auto min-h-screen p-12 antialiased space-y-6">

      <form className="w-full ">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="bg-transparent outline-none w-full text-3xl font-semibold tracking-tight placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">

        <NewNoteCard />

        <NoteCard note={{content: 'hello, world!', date: new Date()}}/>
      </div>
    </main>
  );
}
