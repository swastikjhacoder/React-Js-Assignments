import "./styles.css";
import useFetch from "./useFetch";

export default function App() {
  const { data, loading, error, getJoke } = useFetch(
    "https://api.chucknorris.io/jokes/random?category=dev"
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className="App">
      <h1>Joke Generator</h1>
      <h2>{data.value}</h2>
      <button onClick={getJoke} className="btn">
        New Joke
      </button>
    </div>
  );
}
