export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200">
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-zinc-600">
        <p className="font-semibold text-zinc-900">Soryn</p>
        <p className="mt-1">Technology • Intelligence • Finance</p>

        {/* Placeholders: these become real links once the profile URLs are decided. */}
        <ul className="mt-4 flex gap-4">
          <li>LinkedIn</li>
          <li>GitHub</li>
        </ul>
      </div>
    </footer>
  );
}
