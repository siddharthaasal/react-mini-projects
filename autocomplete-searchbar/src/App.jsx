import './App.css'
import { useEffect, useState } from "react";

// https://dummyjson.com/recipes/search?q=

function App() {

  const [userQuery, setUserQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  async function handleQuery() {
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${userQuery}`);
    const parsedData = await data.json();
    setQueryResults(parsedData?.recipes);
    console.log(parsedData?.recipes);
  }

  useEffect(() => {
    handleQuery();
  }, [userQuery])

  return (
    <>
      <h2>Autocomplete Search Bar</h2>

      <div className="main-container">
        <input
          type="text"
          className="search-bar"
          placeholder="search..."
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        <div>
          {
            showSuggestions &&
            <div className="suggestions-container">
              {
                queryResults.map((result) => {
                  return <span key={result.id}>{result.name}</span>
                })
              }
            </div>

          }
        </div>
      </div>
    </>
  )
}

export default App
