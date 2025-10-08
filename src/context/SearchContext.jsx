import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);

  return (
    <SearchContext.Provider
      value={{
        searchText,
        setSearchText,
        filteredServices,
        setFilteredServices,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
