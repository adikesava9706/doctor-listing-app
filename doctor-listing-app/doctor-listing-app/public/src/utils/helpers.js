export const SPECIALTIES = [
    "General Physician", "Dentist", "Dermatologist", "Paediatrician", "Gynaecologist", "ENT", "Diabetologist", "Cardiologist",
    "Physiotherapist", "Endocrinologist", "Orthopaedic", "Ophthalmologist", "Gastroenterologist", "Pulmonologist", "Psychiatrist",
    "Urologist", "Dietitian/Nutritionist", "Psychologist", "Sexologist", "Nephrologist", "Neurologist", "Oncologist", "Ayurveda", "Homeopath"
  ];
  
  export const formatSpecialtyTestId = (specialty) => {
    return specialty.replace(/[ /]/g, '-');
  };
  
  export const getDefaultPhoto = () => "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.2/svgs/solid/user-md.svg";