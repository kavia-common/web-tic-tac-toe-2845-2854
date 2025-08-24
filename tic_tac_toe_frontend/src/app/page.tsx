"use client";

import { useCallback, useMemo, useState } from "react";

/**
 * Route segment static config to ensure static export-friendly behavior.
 * Exported directly from the route so Next.js recognizes it.
 */
export const dynamic = "error";
export const revalidate = false;
export const runtime = "edge";

/**
 * Types
 */
type Player = "X" | "O";
type CellValue = Player | null;

type GameStatus =
  | { state: "ongoing"; next: Player }
  | { state: "win"; winner: Player; line: number[] }
  | { state: "draw" };

/**
 * Helpers
 */
const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

function calculateStatus(cells: CellValue[], next: Player): GameStatus {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { state: "win", winner: cells[a], line };
    }
  }
  if (cells.every((c) => c !== null)) {
    return { state: "draw" };
  }
  return { state: "ongoing", next };
}

/**
 * PUBLIC_INTERFACE
 * GameBoard component renders the 3x3 grid and handles user moves.
 */
function GameBoard({
  cells,
  onMove,
  disabled,
}: {
  cells: CellValue[];
  onMove: (index: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe Board">
      {cells.map((value, idx) => {
        const isX = value === "X";
        const isO = value === "O";
        return (
          <button
            key={idx}
            aria-label={`Cell ${idx + 1}${value ? `, ${value}` : ""}`}
            className={`cell ${isX ? "cell--x" : ""} ${isO ? "cell--o" : ""}`}
            onClick={() => onMove(idx)}
            disabled={disabled || value !== null}
          >
            <span className="cell__value" aria-hidden="true">
              {value ?? ""}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * StatusPanel displays the current game state in a friendly way.
 */
function StatusPanel({ status }: { status: GameStatus }) {
  const label = "Game status";
  let value: string;
  let cls = "status__value status__value--ongoing";
  if (status.state === "ongoing") {
    value = `Next: ${status.next}`;
  } else if (status.state === "win") {
    value = `Winner: ${status.winner}`;
    cls = "status__value status__value--win";
  } else {
    value = "Draw";
    cls = "status__value status__value--draw";
  }

  return (
    <div className="status" role="status" aria-live="polite">
      <span className="status__label">{label}</span>
      <span className={cls}>{value}</span>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * RestartButton allows the user to start a new game.
 */
function RestartButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="button button--primary" onClick={onClick}>
      Restart game
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 * Home page composes the Tic Tac Toe game.
 */
export default function Home() {
  const [cells, setCells] = useState<CellValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  const nextPlayer: Player = xIsNext ? "X" : "O";

  const status = useMemo(
    () => calculateStatus(cells, nextPlayer),
    [cells, nextPlayer]
  );

  const handleMove = useCallback(
    (index: number) => {
      if (status.state !== "ongoing" || cells[index] !== null) return;

      setCells((prev) => {
        const draft = [...prev];
        draft[index] = nextPlayer;
        return draft;
      });
      setXIsNext((prev) => !prev);
    },
    [status.state, cells, nextPlayer]
  );

  const handleRestart = useCallback(() => {
    setCells(Array(9).fill(null));
    setXIsNext(true);
  }, []);

  const controls = (
    <div className="panel">
      <StatusPanel status={status} />
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm text-[#4A5568]">
          You are playing:{" "}
          <strong style={{ color: "var(--color-secondary)" }}>
            {nextPlayer}
          </strong>
        </div>
        <RestartButton onClick={handleRestart} />
      </div>
    </div>
  );

  return (
    <main className="container-center">
      <section aria-label="Tic Tac Toe" className="w-full max-w-[560px]">
        <header className="header">
          <h1 className="header__title">Tic Tac Toe</h1>
          <p className="header__subtitle">
            Minimal, responsive, 2-player game. X starts.
          </p>
        </header>

        <GameBoard
          cells={cells}
          onMove={handleMove}
          disabled={status.state !== "ongoing"}
        />

        {controls}
      </section>
    </main>
  );
}
