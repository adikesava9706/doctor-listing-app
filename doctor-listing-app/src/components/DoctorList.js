import React from 'react';
import DoctorCard from './DoctorCard';

function DoctorList({ doctors, loading, error }) {
  if (loading) {
    return (
      <div className="text-center text-gray-500 text-xl mt-12">
        <i className="fas fa-spinner fa-spin text-4xl mb-2 text-blue-400"></i><br/>
        Loading doctors...
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full flex flex-col items-center text-xl text-red-500 py-14">
        <i className="fas fa-triangle-exclamation text-4xl mb-2 animate-pulse"></i>
        Failed to load doctor data. Please refresh.
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div id="no-results" className="text-center text-gray-500 text-xl mt-12">
        <i className="fas fa-user-md text-4xl mb-2 text-blue-400 animate-bounce"></i><br/>
        No doctors found matching your criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
      {doctors.map(doctor => (
        <DoctorCard key={doctor.id || doctor.name} doctor={doctor} />
      ))}
    </div>
  );
}

export default DoctorList;