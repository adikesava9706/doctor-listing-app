import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useFilteredDoctors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [doctorNames, setDoctorNames] = useState([]);

  // Extract current filters from URL
  const filters = {
    q: searchParams.get('q') || '',
    ct: searchParams.get('ct') || '',
    sp: searchParams.get('sp') ? searchParams.get('sp').split(',').filter(Boolean) : [],
    sort: searchParams.get('sort') || ''
  };

  // Update URL based on filter changes
  const updateFilters = useCallback((newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.q) params.append('q', newFilters.q);
    if (newFilters.ct) params.append('ct', newFilters.ct);
    if (newFilters.sp && newFilters.sp.length > 0) params.append('sp', newFilters.sp.join(','));
    if (newFilters.sort) params.append('sort', newFilters.sort);
    setSearchParams(params);
  }, [setSearchParams]);

  // Fetch doctor data
  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      try {
        const response = await fetch("https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        // Clean data
        data.forEach(doc => {
          doc.fees = doc.fees && typeof doc.fees === 'string' ? doc.fees : "₹ 0";
          let exp = (doc.experience || "").match(/(\d+)/);
          doc.experience = exp ? exp[1] : "0";
        });
        setAllDoctors(data);
        setDoctorNames(Array.from(new Set(data.map(d => d.name))).sort());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchDoctors();
  }, []);

  // Apply filtering whenever filters change
  useEffect(() => {
    if (allDoctors.length === 0) return;
    
    let result = [...allDoctors];
    
    // Apply search filter
    if (filters.q) {
      const query = filters.q.trim().toLowerCase();
      result = result.filter(doc => doc.name.toLowerCase().includes(query));
    }
    
    // Apply consultation type filter
    if (filters.ct === 'video_consult') {
      result = result.filter(doc => doc.video_consult);
    } else if (filters.ct === 'in_clinic') {
      result = result.filter(doc => doc.in_clinic);
    }
    
    // Apply specialty filter
    if (filters.sp && filters.sp.length > 0) {
      result = result.filter(doc => 
        doc.specialities.some(spec => filters.sp.includes(spec.name))
      );
    }
    
    // Apply sorting
    if (filters.sort === 'fees') {
      result.sort((a, b) =>
        parseInt(a.fees.replace(/[₹, ]/g,'')) - parseInt(b.fees.replace(/[₹, ]/g,''))
      );
    } else if (filters.sort === 'experience') {
      result.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
    }
    
    setFilteredDoctors(result);
  }, [allDoctors, filters]);

  // Return everything needed
  return {
    allDoctors,
    filteredDoctors,
    doctorNames,
    loading,
    error,
    filters,
    updateFilters
  };
}
5. Create components:
Copy// src/components/AutocompleteSuggestions.js
import React from 'react';

function AutocompleteSuggestions({ suggestions, visible, onSelect }) {
  if (!visible || suggestions.length === 0) {
    return null;
  }

  return (
    <ul 
      id="search-suggestions"
      className="search-suggestions absolute top-11 left-0 w-64 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg"
    >
      {suggestions.map((suggestion, index) => (
        <li 
          key={index}
          data-testid="suggestion-item"
          className="cursor-pointer px-4 py-2 hover:bg-blue-50 transition"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
}

export default AutocompleteSuggestions;