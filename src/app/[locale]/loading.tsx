export default function LocaleLoading() {
  return (
    <div className="mx-auto flex min-h-[40vh] max-w-7xl items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
        <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-border border-t-teal" />
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
