'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'

const EXAMPLES = [
  {
    label: 'Tluče bubeníček',
    emoji: '🥁',
    text: 'Tluče bubeníček, tluče na buben.\nMá paličky ze dřeva bukového,\nz telecí kůže buben.',
  },
  {
    label: 'Skákal pes',
    emoji: '🐕',
    text: 'Skákal pes přes oves,\npřes zelenou louku.\nŠel za ním myslivec,\npéro na klobouku.',
  },
  {
    label: 'Holka modrooká',
    emoji: '👧',
    text: 'Holka modrooká,\nnesedávej u potoka.\nHolka modrooká,\nnesedávej tam.',
  },
  {
    label: 'Kočka leze dírou',
    emoji: '🐱',
    text: 'Kočka leze dírou,\npes oknem.\nKočka leze dírou,\npes oknem.\nNebude-li pršet,\nnezmoknem.',
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
  const [wiggle, setWiggle] = useState(false)

  const hasInput = input.trim().length > 0
  const output = useMemo(() => reverse(input, keepPunct), [input, keepPunct])

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  useEffect(() => {
    if (!wiggle) return
    const t = setTimeout(() => setWiggle(false), 600)
    return () => clearTimeout(t)
  }, [wiggle])

  const copy = useCallback(async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
  }, [output])

  return (
    <main className="min-h-dvh flex flex-col items-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <img
            src="/maskot.webp"
            alt="Maskot Pozpátku"
            width={2100}
            height={1536}
            className="mx-auto w-52 sm:w-64 h-auto mb-2"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-purple-500 mb-3">
            Pozpátku!
          </h1>
          <p className="text-lg text-zinc-600 leading-relaxed">
            Napiš text a já ti ho otočím pozpátku!
            <br />
            <span className="text-sm text-zinc-400">
              Každé slovo se převrátí, ale zůstane na svém místě.
            </span>
          </p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-semibold text-zinc-500 mb-2">
            Zkus jednu z písniček:
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => {
                  setInput(ex.text)
                  setWiggle(true)
                }}
                className="text-sm px-4 py-2 rounded-full bg-white border-2 border-zinc-200 hover:border-orange-300 hover:bg-orange-50 text-zinc-700 font-medium transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              >
                <span className="mr-1.5">{ex.emoji}</span>
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mb-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Sem napiš nebo vlož text..."
            rows={5}
            className="w-full rounded-2xl bg-white border-2 border-zinc-200 p-4 text-zinc-800 text-lg placeholder:text-zinc-400 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 resize-y transition-all shadow-sm"
          />
          {input && (
            <button
              onClick={() => setInput('')}
              className="absolute top-3 right-3 size-7 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-400 hover:text-zinc-600 flex items-center justify-center text-sm transition-colors cursor-pointer"
            >
              x
            </button>
          )}
        </div>

        <label className="inline-flex items-center gap-2.5 text-sm text-zinc-500 cursor-pointer select-none mb-6">
          <input
            type="checkbox"
            checked={keepPunct}
            onChange={(e) => setKeepPunct(e.target.checked)}
            className="size-4 rounded accent-purple-500"
          />
          Zachovat interpunkci na místě (tečky, čárky...)
        </label>

        {hasInput && (
          <div className="flex justify-center mb-4">
            <div className={`text-4xl select-none ${wiggle ? 'animate-wiggle' : ''}`}>
              ⬇️
            </div>
          </div>
        )}

        {hasInput && (
          <div className="relative">
            <div className="w-full rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 p-5 min-h-[120px] whitespace-pre-wrap break-words text-xl leading-relaxed text-purple-700 font-medium shadow-sm selection:bg-purple-200">
              {output}
            </div>
            <button
              onClick={copy}
              className="absolute top-3 right-3 text-sm font-semibold px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
            >
              {copied ? 'Zkopírováno! ✓' : 'Kopírovat 📋'}
            </button>
          </div>
        )}

        {!hasInput && (
          <div className="mt-8 rounded-2xl bg-white border-2 border-zinc-100 p-6 shadow-sm">
            <h2 className="font-bold text-lg text-zinc-700 mb-3">
              Jak to funguje?
            </h2>
            <div className="space-y-2 text-sm text-zinc-500">
              <p>
                <span className="font-semibold text-zinc-700">Tluče</span>
                {' → '}
                <span className="font-semibold text-purple-600">ečulT</span>
              </p>
              <p>
                <span className="font-semibold text-zinc-700">bubeníček</span>
                {' → '}
                <span className="font-semibold text-purple-600">kečínebub</span>
              </p>
              <p>
                <span className="font-semibold text-zinc-700">Tluče bubeníček</span>
                {' → '}
                <span className="font-semibold text-purple-600">ečulT kečínebub</span>
              </p>
              <p className="pt-2 text-zinc-400">
                Každé slovo se otočí pozpátku, ale slovosled zůstane stejný!
              </p>
            </div>
          </div>
        )}

        <p className="mt-12 text-center text-xs text-zinc-400">
          Vytvořeno pro táborové hry a šifrovačky &middot;{' '}
          <a href="https://github.com/kasparek-net/pozpatku" className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-700 no-underline" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            GitHub
          </a>
        </p>
      </div>
    </main>
  )
}
