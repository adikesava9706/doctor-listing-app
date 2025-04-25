import React from 'react';
import { getDefaultPhoto } from '../utils/helpers';

function DoctorCard({ doctor }) {
  const photo = doctor.photo && doctor.photo.startsWith("http") 
    ? doctor.photo 
    : getDefaultPhoto();
    
  const specs = doctor.specialities.map(s => s.name).join(', ');

  return (
    <div 
      data-testid="doctor-card" 
      className="bg-white rounded-xl shadow-md overflow-visible transform transition-all hover:scale-105 hover:shadow-lg focus-within:scale-105 focus-within:shadow-2xl border border-blue-50 fade-in"
    >
      <div className="p-5 flex flex-col">
        <div className="flex items-center mb-3">
          <img 
            src={photo} 
            alt={doctor.name} 
            className="rounded-full w-16 h-16 sm:w-20 sm:h-20 object-cover ring-2 ring-blue-100 bg-gray-100 border border-gray-200 mr-4 transition-all duration-200 hover:scale-110" 
          />
          <div>
            <span data-testid="doctor-name" className="block text-xl font-semibold text-blue-800">
              {doctor.name}
            </span>
            <span data-testid="doctor-specialty" className="block text-sm text-gray-700">
              {specs}
            </span>
          </div>
        </div>
        <div className="flex flex-col text-gray-600 text-sm">
          <span data-testid="doctor-experience">
            <i className="fas fa-calendar-alt text-blue-400 mr-1"></i> 
            Experience: <span className="font-medium">{doctor.experience} years</span>
          </span>
          <span data-testid="doctor-fee">
            <i className="fas fa-rupee-sign text-green-400 mr-1"></i> 
            Fee: <span className="font-medium">{doctor.fees}</span>
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {doctor.video_consult && (
            <span className="bg-blue-50 text-blue-600 rounded px-2 py-1 text-xs font-semibold">
              <i className="fas fa-video mr-1"></i>Video Consult
            </span>
          )}
          {doctor.in_clinic && (
            <span className="bg-green-50 text-green-600 rounded px-2 py-1 text-xs font-semibold">
              <i className="fas fa-hospital-user mr-1"></i>In Clinic
            </span>
          )}
          <span className="bg-gray-50 text-gray-500 px-2 py-1 rounded text-xs">
            {doctor.clinic && doctor.clinic.address ? doctor.clinic.address.city : 'Location unknown'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;