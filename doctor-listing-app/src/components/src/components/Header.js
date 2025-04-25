import React, { useState, useEffect, useRef } from 'react';
import AutocompleteSuggestions from './AutocompleteSuggestions';

function Header({ doctorNames, queryValue, onQueryChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    // Handle clicks outside the search component
    const handleOutsideClick = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target) &&
          suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    
    // Update parent component with new query
    onQueryChange(query);
    
    // Update suggestions
    if (query.trim()) {
      const filtered = doctorNames
        .filter(name => name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 3);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (selected) => {
    onQueryChange(selected);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0 && showSuggestions) {
      handleSelectSuggestion(suggestions[0]);
    }
  };

  return (
    <section className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div className="flex flex-col mb-5 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2 fade-in">Find Your Doctor</h1>
        <p className="text-gray-600 text-lg">
          Discover the best doctors near you. Filter by specialty, consultation type, experience & more.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative" ref={suggestionsRef}>
          <input
            id="autocomplete-input"
            data-testid="autocomplete-input"
            type="text"
            autoComplete="off"
            className="w-64 py-2 pl-10 pr-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Search by doctor's name..."
            value={queryValue}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(queryValue.trim().length > 0)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-400 pointer-events-none">
            <i className="fas fa-search"></i>
          </span>
          <AutocompleteSuggestions
            suggestions={suggestions}
            visible={showSuggestions}
            onSelect={handleSelectSuggestion}
          />
        </div>
      </div>
    </section>
  );
}

export default Header;
Copy// src/components/App.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import FilterPanel from './FilterPanel';
import DoctorList from './DoctorList';
import useFilteredDoctors from '../hooks/useFilteredDoctors';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const { 
    filteredDoctors, 
    doctorNames, 
    loading, 
    error,
    filters,
    updateFilters 
  } = useFilteredDoctors();

  const handleQueryChange = (query) => {
    updateFilters({ ...filters, q: query });
  };

  return (
    <main className="w-full max-w-7xl mx-auto py-8 px-4">
      <Header 
        doctorNames={doctorNames} 
        queryValue={filters.q}
        onQueryChange={handleQueryChange} 
      />

      <div className="flex flex-col md:flex-row md:space-x-10">
        <aside className="w-full md:w-1/4 mb-8 md:mb-0">
          <FilterPanel 
            filters={filters}
            updateFilters={updateFilters}
          />
        </aside>

        <section className="w-full md:w-3/4">
          <DoctorList 
            doctors={filteredDoctors}
            loading={loading}
            error={error}
          />
        </section>
      </div>
    </main>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;