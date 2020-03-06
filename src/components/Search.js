function Searchbar() {

  const [finalQuery, setQuery] = useState("");


  return (
    <SearchBar
        value={finalQuery}
        onChange={(newValue) => setQuery(newValue)}
        onRequestSearch={() => doSomethingWith(query)}
    />
    )