export default function EmptyState({ label = "No results" }) {
  return (
    <div className="text-center text-muted py-5">
      <small>{label}</small>
    </div>
  );
}
