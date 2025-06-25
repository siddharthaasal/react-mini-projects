import './App.css'
import { useEffect, useState } from "react";

// https://dummyjson.com/recipes/search?q=

function App() {

  const [userQuery, setUserQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [cachedQueryResults, setCachedQueryResults] = useState({}); //{userQuery: res[]}
  const [showSuggestions, setShowSuggestions] = useState(false);

  async function handleQuery() {

    // check if the input's results are cached
    if (cachedQueryResults[userQuery]) {
      console.log("Returned from cache", userQuery);
      setQueryResults(cachedQueryResults[userQuery]);
      return;
    }

    console.log("API call made for", userQuery);
    console.log(cachedQueryResults);
    const data = await fetch(`https://dummyjson.com/recipes/search?q=${userQuery}`);
    const parsedData = await data.json();
    setCachedQueryResults(prev => ({ ...prev, [userQuery]: parsedData?.recipes }));
    setQueryResults(parsedData?.recipes);
  }

  useEffect(() => {
    // debouncing to minimize api calls
    const callApi = setTimeout(() => {
      handleQuery();
    }, 400);

    return () => clearTimeout(callApi);

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
