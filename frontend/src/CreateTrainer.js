import React, { useState } from 'react';
import axios from 'axios';

const CreateTrainer = ({profileName}) => {

  const [formData, setFormData] = useState({
    name: '',
    commercialsPerHour: '',
    commercialsPerDay: '',
    location: '',
    linkToPDF: '',
    skills: [], // Initialize skills as an array
    ratings: '',
    email: '',
    alternateEmail: '',
    phoneNumber: '',
    alternateNumber: '',
    experience: '',
    notes: '',
  });

  const [skillInput, setSkillInput] = useState(''); // Track the current skill being entered

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillInput = (e) => {
    setSkillInput(e.target.value);
  };

  const addSkill = () => {
    if (skillInput.trim() !== '') {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput], // Add the skill to the list
      });
      setSkillInput(''); // Clear the skill input field
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };


  
  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsString = formData.skills.join(',');

console.log(profileName);
    const updatedFormData = {
      name: formData.name,
      commercialsPerHour: formData.commercialsPerHour,
      commercialsPerDay: formData.commercialsPerDay,
      location: formData.location,
      linkToPDF: formData.linkToPDF, // Update this with the actual PDF link
      skills: skillsString,
      ratings: formData.ratings,
      email: formData.email,
      alternateEmail: formData.alternateEmail,
      phoneNumber: formData.phoneNumber,
      alternateNumber: formData.alternateNumber,
      username: profileName,
      createdAt: new Date().toISOString().split('T')[0],
      experience: formData.experience,
      notes: formData.notes,
    };
        // Send the trainer data to the "/createtrainer" endpoint
        axios
          .post("http://20.219.81.67:5000/createtrainer", updatedFormData)
          .then((trainerCreationResponse) => {
            console.log("Trainer creation success:", trainerCreationResponse);
  
            // Handle success (e.g., show a success message, clear the form)
            alert("Trainer created successfully");
  
            // Clear the form
            setFormData({
              name: "",
              commercialsPerHour: "",
              commercialsPerDay: "",
              location: "",
              linkToPDF: "", // Update this with the actual PDF link
              skills: [],
              ratings: "",
              email: "",
              alternateEmail: "",
              phoneNumber: "",
              alternateNumber: "",
              experience: "",
              notes: "",
            });
          })
          .catch((trainerCreationError) => {
            console.error("Trainer creation error:", trainerCreationError);
          });
        };
        const isValidPhoneNumber = (phoneNumber) => {
          // Check if the phone number has exactly 10 digits
          const phoneNumberRegex = /^\d{10}$/;
          return phoneNumberRegex.test(phoneNumber);
        };
  
  return (
   
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className='text-lg font-bold mb-4'>New Trainer</h3>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className=" p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            {/* Commercials Per Hour */}
            <div className="mt-4">
              <label htmlFor="commercialsPerHour" className="block text-sm font-medium text-gray-700">
                Commercials Per Hour
              </label>
              <input
                type="number"
                name="commercialsPerHour"
                id="commercialsPerHour"
                autoComplete="commercialsPerHour"
                className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.commercialsPerHour}
                onChange={handleChange}
                required
              />
            </div>
            {/* Commercials Per Day */}
            <div className="mt-4">
              <label htmlFor="commercialsPerDay" className="block text-sm font-medium text-gray-700">
                Commercials Per Day
              </label>
              <input
                type="number"
                name="commercialsPerDay"
                id="commercialsPerDay"
                autoComplete="commercialsPerDay"
                className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.commercialsPerDay}
                onChange={handleChange}
                required
              />
            </div>
            {/* Location */}
            <div className="mt-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                autoComplete="location"
                className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            {/* Link to PDF */}
            <div className="mt-4">
              <label htmlFor="linkToPDF" className="block text-sm font-medium text-gray-700">
                Link to PDF
              </label>
              <input
                type="text"
                name="linkToPDF"
                id="linkToPDF"
                autoComplete="linkToPDF"
                className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.linkToPDF}
                onChange={handleChange}
                required
              />
            </div>
            {/* Ratings */}
            <div className="mt-4">
              <label htmlFor="ratings" className="block text-sm font-medium text-gray-700">
                Ratings
              </label>
              <input
                type="number"
                name="ratings"
                id="ratings"
                autoComplete="ratings"
                className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.ratings}
                onChange={handleChange}
                required
              />
            </div>
            {/* Experience */}
            <div className="mt-4">
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                Experience
              </label>
              <input
                type="number"
                name="experience"
                id="experience"
                autoComplete="experience"
                className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>
            {/* Email */}
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* Alternate Email */}
            <div className="mt-4">
              <label htmlFor="alternateEmail" className="block text-sm font-medium text-gray-700">
                Alternate Email
              </label>
              <input
                type="email"
                name="alternateEmail"
                id="alternateEmail"
                autoComplete="alternateEmail"
                className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.alternateEmail}
                onChange={handleChange}
              />
            </div>
            {/* Phone Number */}
            <div className="mt-4">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                autoComplete="phoneNumber"
                className={`p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${isValidPhoneNumber(formData.phoneNumber) ? '' : 'border-red-500'}`}
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              {!isValidPhoneNumber(formData.phoneNumber) && (
                <p className="mt-2 text-sm text-red-600">Please enter a valid 10-digit phone number.</p>
              )}
            </div>
            {/* Alternate Number */}
            <div className="mt-4">
              <label htmlFor="alternateNumber" className="block text-sm font-medium text-gray-700">
                Alternate Number
              </label>
              <input
                type="text"
                name="alternateNumber"
                id="alternateNumber"
                autoComplete="alternateNumber"
                className={`p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${isValidPhoneNumber(formData.alternateNumber) ? '' : 'border-red-500'}`}
                value={formData.alternateNumber}
                onChange={handleChange}
                required
              />
              {!isValidPhoneNumber(formData.alternateNumber) && (
                <p className="mt-2 text-sm text-red-600">Please enter a valid 10-digit phone number.</p>
              )}
            </div>
            {/* Notes */}
            <div className="mt-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <input
                type="text"
                name="notes"
                id="notes"
                autoComplete="notes"
                className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.notes}
                onChange={handleChange}
                maxLength={500}
              />
            </div>
            {/* Skills */}
            <div className="mt-4">
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <input
                type="text"
                name="skills"
                id="skills"
                autoComplete="skills"
                className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={skillInput}
                onChange={handleSkillInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
            </div>
            {/* Display added skills */}
            <div className="mt-4">
              <ul>
                {formData.skills.map((skill, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {skill}
                    <span className="text-red-500 ml-2 cursor-pointer" onClick={() => removeSkill(index)}>X</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Trainer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default CreateTrainer;
