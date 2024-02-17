import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "./ui/dialog"
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from "date-fns/locale"


type NoteCardProps = {
  note: {
    date: Date,
    content: string,
    id: string
  },
  onNoteDelete: (id: string) => void
}

export function NoteCard({ note, onNoteDelete }: NoteCardProps) {

  return (
    <Dialog>

      <DialogTrigger className="rounded-md flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 text-left focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
        </span>

        <p className="text-sm leading-6 text-slate-400">
          {note.content}
        </p>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </DialogTrigger>

      <DialogContent className="flex flex-col bg-slate-700 h-[60vh] p-0">
        <div className="flex flex-1 flex-col gap-3 p-5">
          <span className="text-sm font-medium text-slate-300">
            {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
          </span>

          <p className="text-sm leading-6 text-slate-400">
            {note.content}
          </p>
        </div>

        <DialogClose asChild>
          <button
            type="button"
            onClick={() => onNoteDelete(note.id)}
            className="w-full h-min bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none  rounded font-medium group"
          >
            Deseja <span className="text-red-400 group-hover:underline">apagar essa nota</span>?
          </button>
        </DialogClose>
      </DialogContent>

    </Dialog>
  )
}