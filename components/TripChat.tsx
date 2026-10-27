"use client";

import { useEffect, useRef, useState } from "react";
import {
  mockExperience,
  mockFood,
  mockReplyText,
  mockStay,
} from "@/lib/mock-response";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  showMock?: boolean;
};

const THINKING_MS = 1500;

export default function TripChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Ask me about a Kyoto weekend and I'll show you a sample plan.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const nextId = useRef(1);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || thinking) return;

    setMessages((m) => [...m, { id: nextId.current++, role: "user", text }]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "assistant", text: mockReplyText, showMock: true },
      ]);
      setThinking(false);
    }, THINKING_MS);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4">
      <header className="sticky top-0 z-10 -mx-4 border-b border-black/10 bg-[var(--background)]/90 px-4 py-4 backdrop-blur dark:border-white/10">
        <h1 className="text-lg font-semibold tracking-tight">Kyoto Weekend Planner</h1>
      </header>

      <section className="flex-1 space-y-4 py-6" aria-live="polite">
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "flex justify-end" : "space-y-3"}>
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] rounded-2xl rounded-br-sm bg-stone-800 px-4 py-2.5 text-sm text-white dark:bg-stone-200 dark:text-stone-900"
                  : "max-w-[92%] rounded-2xl rounded-bl-sm border border-black/10 bg-white px-4 py-2.5 text-sm dark:border-white/10 dark:bg-stone-900"
              }
            >
              {m.text}
            </div>
            {m.showMock && <MockCards />}
          </div>
        ))}

        {thinking && (
          <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-black/10 bg-white px-4 py-3 w-fit dark:border-white/10 dark:bg-stone-900" role="status" aria-label="Planner is thinking">
            <span className="thinking-dot" />
            <span className="thinking-dot [animation-delay:150ms]" />
            <span className="thinking-dot [animation-delay:300ms]" />
          </div>
        )}
        <div ref={endRef} />
      </section>

      <form
        onSubmit={send}
        className="sticky bottom-0 -mx-4 flex gap-2 border-t border-black/10 bg-[var(--background)]/95 px-4 pb-4 pt-3 backdrop-blur dark:border-white/10"
      >
        <label htmlFor="trip-input" className="sr-only">
          Message
        </label>
        <input
          id="trip-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={thinking}
          placeholder={thinking ? "Planning…" : "Ask about a Kyoto weekend"}
          className="min-w-0 flex-1 rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-stone-500 disabled:opacity-60 dark:border-white/20 dark:bg-stone-900"
        />
        <button
          type="submit"
          disabled={thinking || !input.trim()}
          className="rounded-xl bg-stone-800 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-40 dark:bg-stone-200 dark:text-stone-900"
        >
          Send
        </button>
      </form>
    </main>
  );
}

function MockCards() {
  return (
    <div className="space-y-3">
      <Card label="Stay">
        <p className="font-semibold">{mockStay.title}</p>
        <p className="text-xs text-black/60 dark:text-white/60">
          {mockStay.neighbourhood} · ${mockStay.pricePerNight}/night · ${mockStay.totalForTwoNights} for two nights · ★ {mockStay.rating}
        </p>
        <p className="text-xs text-black/60 dark:text-white/60">
          Check-in {mockStay.checkIn} · Check-out {mockStay.checkOut}
        </p>
      </Card>
      <Card label="Experience">
        <p className="font-semibold">{mockExperience.title}</p>
        <p className="text-xs text-black/60 dark:text-white/60">
          {mockExperience.date} at {mockExperience.startTime} · {mockExperience.durationHours} h · ${mockExperience.totalForTwoGuests} for two · {mockExperience.meetingPoint}
        </p>
      </Card>
      <Card label="Food">
        <p className="font-semibold">{mockFood.name}</p>
        <p className="text-xs text-black/60 dark:text-white/60">
          {mockFood.meal} · {mockFood.cuisine} · ~${mockFood.estCostForTwo} for two · {mockFood.walkFromStayMin} min walk · {mockFood.bookingNote}
        </p>
      </Card>
    </div>
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-4 text-sm dark:border-white/10 dark:bg-stone-900">
      <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-black/50 dark:text-white/50">{label}</p>
      {children}
    </article>
  );
}
