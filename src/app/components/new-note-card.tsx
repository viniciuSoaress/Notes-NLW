'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "./ui/dialog"
import { useToast } from './ui/use-toast'

type NewNoteCardProps = {
  onNoteCreated: (content: string) => void
}


let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const { toast } = useToast()


  const [shoutShowOnboarding, setShoutShowOnboarding] = useState(true)
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)


  function handleStartClick() {
    setShoutShowOnboarding(false)
  }

  function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value)
    if (e.target.value === '') {
      setShoutShowOnboarding(true)
    }
  }

  function handleSaveNoteSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (content != '') {
      onNoteCreated(content)
      toast({
        title: "Nota criada com sucesso!",
      })
    } else {
      toast({
        title: "Nota não pode ser vasia!",
      })
    }
    setContent('')
    setShoutShowOnboarding(true)
  }

  function handleStartRecording() {

    const isSpeechRecognitionAPIAvalable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvalable) {
      toast({
        title: "Não e posivel gravar nota!",
      })
      return
    }

    setIsRecording(true)
    setShoutShowOnboarding(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const trancription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(trancription)
    }

    speechRecognition.onerror = (error) => {
      console.log(error)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)
    if (speechRecognition !== null) {
      speechRecognition.stop()
    }
  }

  return (
    <Dialog>

      <DialogTrigger className="flex flex-col  rounded-md bg-slate-700 p-5 gap-3 text-left hover:ring-2 hover:ring-slate-600  focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>

        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em audio que seráconvertida em texto automaticamente.
        </p>
      </DialogTrigger>

      <DialogContent className="bg-slate-700 h-[60vh] p-0">
        <form onSubmit={handleSaveNoteSubmit} className='flex-1 flex flex-col'>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              Adicionar nota
            </span>

            {shoutShowOnboarding ? (
              <p className="text-sm leading-6 text-slate-400">
                Comece <button type='button' className="font-medium text-lime-400 hover:underline" onClick={handleStartRecording}> gravando um nota</button> em áudio ou se priferir <button type='button' onClick={handleStartClick} className="font-medium text-lime-400 hover:underline">utilize texto</button> .
              </p>
            ) : (
              <textarea
                value={content}
                autoFocus
                className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                onChange={handleContentChange}
              />
            )}
          </div>

          {isRecording ? (
            <button
              type="button"
              onClick={handleStopRecording}
              className="flex justify-center items-center gap-2 w-full h-min bg-slate-900  py-4 text-center text-sm text-slate-300 outline-none rounded font-medium hover:text-slate-100"
            >
              <div className='size-3 rounded-full bg-red-500 animate-pulse' />
              gravando (click p/ interoper)
            </button>
          ) : (
            <DialogClose asChild>
              <button
                type="submit"
                className="w-full h-min bg-lime-400  py-4 text-center text-sm text-lime-950 outline-none rounded font-medium hover:bg-lime-500"
              >
                Salvar nota
              </button>
            </DialogClose>
          )}



        </form>
      </DialogContent>
    </Dialog>
  )
}