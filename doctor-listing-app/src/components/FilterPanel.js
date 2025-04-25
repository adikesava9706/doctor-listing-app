import React from 'react';
import { SPECIALTIES, formatSpecialtyTestId } from '../utils/helpers';

function FilterPanel({ filters, updateFilters }) {
  const handleConsultationChange = (value) => {
    updateFilters({ ...filters, ct: value });
  };

  const handleSortChange = (value) => {
    updateFilters({ ...filters, sort: value });
  };

  const handleSpecialtyChange = (specialty, checked) => {
    const currentSpecialties = [...filters.sp];
    
    if (checked && !currentSpecialties.includes(specialty)) {
      currentSpecialties.push(specialty);
    } else if (!checked) {
      const index = currentSpecialties.indexOf(specialty);
      if (index !== -1) {
        currentSpecialties.splice(index, 1);
      }
    }
    
    updateFilters({ ...filters, sp: currentSpecialties });
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 scale-in">
      {/* Consultation Type Filter */}
      <h2 className="text-lg font-semibold mb-2" data-testid="filter-header-moc">
        <i className="fas fa-video text-blue-500 mr-2"></i>Consultation Type
      </h2>
      <div className="mb-4 flex flex-col space-y-1">
        <label className="flex items-center cursor-pointer">
          <input 
            data-testid="filter-video-consult" 
            type="radio" 
            name="consultation-type" 
            value="video_consult" 
            checked={filters.ct === 'video_consult'}
            onChange={() => handleConsultationChange('video_consult')}
          />
          Video Consult
        </label>
        <label className="flex items-center cursor-pointer">
          <input 
            data-testid="filter-in-clinic" 
            type="radio" 
            name="consultation-type" 
            value="in_clinic"
            checked={filters.ct === 'in_clinic'} 
            onChange={() => handleConsultationChange('in_clinic')}
          />
          In Clinic
        </label>
        <label className="flex items-center cursor-pointer">
          <input 
            type="radio" 
            name="consultation-type" 
            value=""
            checked={filters.ct === ''} 
            onChange={() => handleConsultationChange('')}
          />
          <span className="text-gray-500">Any</span>
        </label>
      </div>

      {/* Specialties Filter */}
      <h2 className="text-lg font-semibold mb-2 mt-6" data-testid="filter-header-speciality">
        <i className="fas fa-stethoscope text-green-500 mr-2"></i>Specialties
      </h2>
      <div className="flex flex-col space-y-1 max-h-96 overflow-auto">
        {SPECIALTIES.map(specialty => {
          const testId = `filter-specialty-${formatSpecialtyTestId(specialty)}`;
          return (
            <label key={specialty} className="flex items-center cursor-pointer">
              <input 
                data-testid={testId}
                type="checkbox" 
                value={specialty}
                checked={filters.sp.includes(specialty)}
                onChange={(e) => handleSpecialtyChange(specialty, e.target.checked)}
              />
              {specialty}
            </label>
          );
        })}
      </div>

      {/* Sorting */}
      <h2 className="text-lg font-semibold mb-2 mt-6" data-testid="filter-header-sort">
        <i className="fas fa-sort text-yellow-500 mr-2"></i>Sort
      </h2>
      <div className="flex flex-col space-y-1">
        <label className="flex items-center cursor-pointer">
          <input 
            data-testid="sort-fees"
            type="radio" 
            name="sort" 
            value="fees"
            checked={filters.sort === 'fees'} 
            onChange={() => handleSortChange('fees')}
          />
          Fees (Low to High)
        </label>
        <label className="flex items-center cursor-pointer">
          <input 
            data-testid="sort-experience"
            type="radio" 
            name="sort" 
            value="experience"
            checked={filters.sort === 'experience'} 
            onChange={() => handleSortChange('experience')}
          />
          Experience (High to Low)
        </label>
        <label className="flex items-center cursor-pointer">
          <input 
            type="radio" 
            name="sort" 
            value=""
            checked={filters.sort === ''} 
            onChange={() => handleSortChange('')}
          />
          <span className="text-gray-500">None</span>
        </label>
      </div>
    </div>
  );
}

export default FilterPanel;