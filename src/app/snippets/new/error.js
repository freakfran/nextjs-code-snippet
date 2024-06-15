'use client';

export default function ErrorPage({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!{error.message}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}