import React, { useState } from 'react';
import axios from 'axios';

// --- Helper Components ---

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-indigo-400">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const InputField = ({ id, label, type, value, onChange, placeholder, required = true }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
    />
  </div>
);

const SelectField = ({ id, label, value, onChange, children }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
    >
      {children}
    </select>
  </div>
);

// --- Main App Component ---

export default function App() {
  // Extracted and sorted unique job titles from the CSV file.
  const jobTitles = [
    'Account Manager', 'Accountant', 'Administrative Assistant', 'Business Analyst',
    'Business Development Manager', 'Business Intelligence Analyst', 'CEO', 'Chief Data Officer',
    'Chief Technology Officer', 'Content Marketing Manager', 'Copywriter', 'Customer Service Rep',
    'Customer Service Representative', 'Data Analyst', 'Data Scientist', 'Digital Marketing Manager',

    'Director of Marketing', 'Director of Operations', 'Event Coordinator', 'Financial Advisor',
    'Financial Analyst', 'Financial Manager', 'Graphic Designer', 'HR Generalist',
    'HR Manager', 'Help Desk Analyst', 'Human Resources Manager', 'IT Manager',
    'IT Support', 'IT Support Specialist', 'Junior Accountant', 'Junior Business Analyst',
    'Junior Business Development Associate', 'Junior Business Operations Analyst',
    'Junior Copywriter', 'Junior Customer Service Rep', 'Junior Data Analyst',
    'Junior Data Scientist', 'Junior Designer', 'Junior Developer', 'Junior Financial Analyst',
    'Junior HR Generalist', 'Junior HR Coordinator', 'Junior Marketing Analyst',
    'Junior Marketing Coordinator', 'Junior Marketing Manager', 'Junior Marketing Specialist',
    'Junior Operations Analyst', 'Junior Operations Manager', 'Junior Product Manager',
    'Junior Project Manager', 'Junior QA Engineer', 'Junior Recruiter', 'Junior Research Scientist',
    'Junior Sales Representative', 'Junior Social Media Manager', 'Junior Software Developer',
    'Junior Software Engineer', 'Junior UX Designer', 'Junior Web Designer', 'Junior Web Developer',
    'Marketing Analyst', 'Marketing Coordinator', 'Marketing Manager', 'Marketing Specialist',
    'Network Engineer', 'Office Manager', 'Operations Analyst', 'Operations Director',
    'Operations Manager', 'Product Manager', 'Product Marketing Manager', 'Project Engineer',
    'Project Manager', 'Public Relations Manager', 'QA Engineer', 'Receptionist', 'Recruiter',
    'Research Director', 'Research Scientist', 'Sales Associate', 'Sales Director',
    'Sales Executive', 'Sales Manager', 'Sales Operations Manager', 'Sales Representative',
    'Senior Account Manager', 'Senior Accountant', 'Senior Business Analyst',
    'Senior Business Development Manager', 'Senior Business Intelligence Analyst',
    'Senior Business Operations Analyst', 'Senior Copywriter', 'Senior Customer Service Rep',
    'Senior Data Analyst', 'Senior Data Scientist', 'Senior Designer', 'Senior Developer',
    'Senior Financial Analyst', 'Senior Financial Manager', 'Senior Graphic Designer',
    'Senior HR Generalist', 'Senior HR Manager', 'Senior HR Specialist', 'Senior Human Resources Generalist',
    'Senior Human Resources Manager', 'Senior IT Support Specialist', 'Senior Marketing Analyst',
    'Senior Marketing Coordinator', 'Senior Marketing Manager', 'Senior Marketing Specialist',
    'Senior Operations Analyst', 'Senior Operations Manager', 'Senior Product Manager',
    'Senior Project Manager', 'Senior QA Engineer', 'Senior Recruiter', 'Senior Research Scientist',
    'Senior Sales Manager', 'Senior Sales Representative', 'Senior Social Media Manager',
    'Senior Software Developer', 'Senior Software Engineer', 'Senior UX Designer',
    'Senior Web Designer', 'Senior Web Developer', 'Social Media Manager', 'Social Media Specialist',
    'Software Developer', 'Software Engineer', 'Software Engineer Manager', 'Software Manager',
    'Software Project Manager', 'Strategy Manager', 'Supply Chain Analyst',
    'Supply Chain Manager', 'Technical Recruiter', 'Technical Support Specialist',
    'Technical Writer', 'Training Specialist', 'UX Designer', 'UX Researcher', 'VP of Finance',
    'VP of Operations', 'Web Developer'
  ];

  // State for form inputs
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [education, setEducation] = useState("Bachelor's");
  const [jobTitle, setJobTitle] = useState(jobTitles[0]); // Default to the first job title
  const [experience, setExperience] = useState('');

  // State for API interaction
  const [predictedSalary, setPredictedSalary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPredictedSalary(null);
    setError(null);

    const formData = {
      age: parseInt(age, 10),
      gender,
      education,
      jobTitle,
      experience: parseFloat(experience),
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', formData);
      setPredictedSalary(response.data.predictedSalary);
    } catch (err) {
      console.error("Axios Error:", err);
      if (err.response) {
        setError(err.response.data.detail || 'The server returned an error.');
      } else if (err.request) {
        setError('Network Error: Could not connect to the Python server. Is it running?');
      } else {
        setError(`An error occurred: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12">
          {/* --- Header --- */}
          <div className="flex items-center justify-center mb-6 text-center">
            <BriefcaseIcon />
            <h1 className="text-3xl font-bold ml-3 text-white">Salary Predictor</h1>
          </div>
          <p className="text-center text-gray-400 mb-8">
            Enter your details below to get an estimated salary prediction.
          </p>

          {/* --- Form --- */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                id="age"
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g., 30"
              />
              <SelectField id="gender" label="Gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option>Male</option>
                <option>Female</option>
              </SelectField>
            </div>

            <SelectField id="education" label="Highest Level of Education" value={education} onChange={(e) => setEducation(e.target.value)}>
              <option>Bachelor's</option>
              <option>Master's</option>
              <option>PhD</option>
            </SelectField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* --- THIS IS THE CHANGE: Job Title is now a dropdown --- */}
              <SelectField id="jobTitle" label="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}>
                {jobTitles.map(title => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </SelectField>

              <InputField
                id="experience"
                label="Years of Experience"
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g., 5"
              />
            </div>

            {/* --- Submit Button --- */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Predicting...
                </>
              ) : (
                'Predict Salary'
              )}
            </button>
          </form>

          {/* --- Results Display --- */}
          {error && (
            <div className="mt-8 p-4 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg text-center text-red-300">
              <strong>Error:</strong> {error}
            </div>
          )}

          {predictedSalary !== null && !isLoading && (
            <div className="mt-10 text-center bg-gray-900 p-8 rounded-xl animate-fade-in">
              <p className="text-lg text-gray-400 mb-2">Estimated Annual Salary</p>
              <p className="text-5xl font-extrabold text-green-400 tracking-tight">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(predictedSalary)}
              </p>
              <p className="text-sm text-gray-500 mt-4">
                This is an estimate based on your provided ML model. Actual salaries may vary.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Add some basic CSS for the fade-in animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
