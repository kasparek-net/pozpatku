'use client'

import { useState, useCallback } from 'react'

const EXAMPLES = [
  {
    label: 'Tluče bubeníček',
    text: 'Tluče bubeníček, tluče na buben.\nMá paličky ze dřeva bukového,\nz telecí kůže buben.',
  },
  {
    label: 'Skákal pes',
    text: 'Skákal pes přes oves,\npřes zelenou louku.\nŠel za ním myslivec,\npéro na klobouku.',
  },
  {
    label: 'Holka modrooká',
    text: 'Holka modrooká,\nnesedávej u potoka.\nHolka modrooká,\nnesedávej tam.',
  },
]

function isPunct(ch: string) {
  return /[^\p{L}\p{N}\s]/u.test(ch)
}

function reverseWord(word: string, keepPunct: boolean): string {
  if (!word) return word
  const chars = [...word]

  if (!keepPunct) return chars.reverse().join('')

  let leading = ''
  let trailing = ''

  while (chars.length && isPunct(chars[0])) {
    leading += chars.shift()
  }
  while (chars.length && isPunct(chars[chars.length - 1])) {
    trailing = chars.pop() + trailing
  }

  return leading + chars.reverse().join('') + trailing
}

function reverse(text: string, keepPunct: boolean): string {
  return text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) =>
      line
        .split(/( +)/)
        .map((s) => (/^ *$/.test(s) ? s : reverseWord(s, keepPunct)))
        .join('')
    )
    .join('\n')
}

export default function Home() {
  const [input, setInput] = useState('')
  const [keepPunct, setKeepPunct] = useState(true)
  const [copied, setCopied] = useState(false)

  const output = reverse(input, keepPunct)

  const copy = useCallback(async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  return (
    <main className="min-h-dvh flex flex-col items-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-center tracking-tight mb-2">
          Pozpátku
        </h1>
        <p className="text-zinc-400 text-center mb-8 text-sm sm:text-base leading-relaxed">
          Otočí každé slovo v textu pozpátku, slovosled zůstane stejný.
          <br className="hidden sm:block" />{' '}
          Pro táborové hry, šifrovačky a zábavu.
        </p>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-500 uppercase tracking-wide">
              Příklady:
            </span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => setInput(ex.text)}
                className="text-sm px-3 py-1 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
              >
                {ex.label}
              </button>
            ))}
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Sem napiš nebo vlož text…"
            rows={6}
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 resize-y transition-shadow"
            autoFocus
          />

          <label className="flex items-center gap-2.5 text-sm text-zinc-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={keepPunct}
              onChange={(e) => setKeepPunct(e.target.checked)}
              className="size-4 rounded accent-emerald-500"
            />
            Zachovat interpunkci na místě
          </label>

          {input.trim() && (
            <div className="relative group">
              <div className="w-full rounded-xl bg-zinc-900 border border-emerald-500/20 p-4 min-h-[120px] whitespace-pre-wrap break-words text-lg leading-relaxed text-emerald-400 selection:bg-emerald-500/30">
                {output}
              </div>
              <button
                onClick={copy}
                className="absolute top-3 right-3 text-xs font-medium px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
              >
                {copied ? 'Zkopírováno!' : 'Kopírovat'}
              </button>
            </div>
          )}
        </div>

        <p className="mt-16 text-center text-xs text-zinc-700">
          Vytvořeno pro táborové hry
        </p>
      </div>
    </main>
  )
}
