export default function AboutPage() {
  return (
    <main>
      <h1>About Unitrix</h1>
      <div>
        <button
          onClick={() =>
            fetch("/api")
              .then((res) => res.json())
              .then(console.log)
          }
        >
          API
        </button>
      </div>
    </main>
  );
}
