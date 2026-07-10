import World from "@/components/world/World";

export default function Home() {
  return (
    <>
      <World />
      <noscript>
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-cream p-8 text-ink">
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-semibold">Braeden Collins</h2>
            <p className="mt-2 text-sm leading-relaxed">
              This portfolio is an explorable world and needs JavaScript. Everything is also
              available as a plain page:
            </p>
            <a className="mt-4 inline-block font-mono text-sm text-accent underline" href="/plain">
              Open the simple view →
            </a>
          </div>
        </div>
      </noscript>
    </>
  );
}
