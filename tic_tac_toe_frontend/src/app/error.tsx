"use client";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <html>
      <body>
        <main style={{ padding: 24 }}>
          <h1 style={{ fontSize: 20, marginBottom: 8, color: "#2D3748" }}>
            Something went wrong
          </h1>
          <pre
            style={{
              background: "#F7FAFC",
              padding: 12,
              borderRadius: 8,
              border: "1px solid rgba(45,55,72,0.12)",
              whiteSpace: "pre-wrap",
            }}
          >
            {error.message}
          </pre>
        </main>
      </body>
    </html>
  );
}
