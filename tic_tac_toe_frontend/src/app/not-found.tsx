export default function NotFound() {
  return (
    <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center", background: "#FFFFFF" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "#2D3748", fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
          404 — Page Not Found
        </h1>
        <p style={{ color: "#4A5568" }}>
          The page you are looking for does not exist.
        </p>
      </div>
    </main>
  );
}
