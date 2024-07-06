import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Trainers from './Trainers';
import { BrowserRouter as Router ,Routes, Route} from 'react-router-dom'; 
import CreateTrainer from './CreateTrainer';
import Login from './Login';
import Dashboard from './Dashboard';
import { useNavigate } from 'react-router-dom';





function App() {
const navigate = useNavigate();


  const [originalTrainers, setOriginalTrainers] = useState([]); // Store the original trainers data
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [profileName, setProfileName] = useState('');
  const trainersPerPage = 16; // Set the number of trainers to display per page

  const [isReadOnly, setIsReadOnly] = useState(true);

  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    commercialsPerHour: '',
    commercialsPerDay: '',
    location: '',
    linkToPDF: '',
    skills: '', // Initialize skills as an array
    ratings: '',
    email: '',
    alternateEmail: '',
    phoneNumber: '',
    alternateNumber: '',
    experience: '',
    notes: '',
  });

  const fieldChange = () => {
    setIsReadOnly(!isReadOnly);
  };

  const saveChanges = (formData) => {
    // Ensure selectedTrainer has an 'id' property
    if (!formData.id) {
      console.error('Trainer ID is missing. Cannot update.');
      return;
    }

  axios.put(`http://20.219.81.67:5000/trainers/${formData.id}`, formData)
      .then((response) => {
        console.log('Trainer updated successfully:', response.data);
        closeModal(); // Close the modal after successful update

        // Fetch the updated list of trainers
        axios.get('http://20.219.81.67:5000/trainers')
          .then((response) => {
            setOriginalTrainers(response.data); // Update the original trainers data
            setTrainers(response.data); // Update the displayed trainers data
          })
          .catch((error) => {
            console.error('Error fetching updated trainers data:', error);
            // Handle the error, display a message, or perform any other necessary action
          });
      })
      .catch((error) => {
        console.error('Error updating trainer:', error);
        // Handle the error, display a message, or perform any other necessary action
      });
  };
  useEffect(() => {
    axios.get('http://20.219.81.67:5000/trainers') // Replace with your Express API URL
      .then((response) => {
        setOriginalTrainers(response.data); // Store the original data
        setTrainers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const openModal = (trainer) => {
    setSelectedTrainer(trainer);
    setShowModal(true);
    
  };

  const closeModal = () => {
    setSelectedTrainer(null);
    setShowModal(false);
    setIsReadOnly(true);
  };

  const handleSearch = (searchTerm) => {
    // Case-insensitive search
    searchTerm = searchTerm.toLowerCase();

    const filteredTrainers = originalTrainers.filter((trainer) => {
      return (
        (trainer.name && trainer.name.toLowerCase().includes(searchTerm)) ||
        (trainer.email && trainer.email.toLowerCase().includes(searchTerm)) ||
        (trainer.phoneNumber && trainer.phoneNumber.toLowerCase().includes(searchTerm)) ||
        (trainer.skills && trainer.skills.toLowerCase().includes(searchTerm)) ||
        (trainer.alternateEmail && trainer.alternateEmail.toLowerCase().includes(searchTerm)) ||
        (trainer.alternateNumber && trainer.alternateNumber.toLowerCase().includes(searchTerm))
      );
    });

    setTrainers(filteredTrainers);
    setCurrentPage(1); // Reset to the first page when a new search is performed
  };

  const handleReset = () => {
    setTrainers(originalTrainers); // Reset trainers to the original data
    setCurrentPage(1); // Reset to the first page
  };

  // Calculate the indexes for pagination
  const indexOfLastTrainer = currentPage * trainersPerPage;
  const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
  const currentTrainers = trainers.slice(indexOfFirstTrainer, indexOfLastTrainer);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    // Check for a valid token in client storage
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      setProfileName(localStorage.getItem('profileName'));
     

    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/trainers');
    
  };
  if(!loggedIn){
    return <Login onLogin={handleLogin} />;
  }

  const handleLogout = () => {
    
    // Clear the token and log out the user
    localStorage.removeItem('token');
    localStorage.removeItem('profileName');
    setProfileName('');
    setLoggedIn(false);
    
    
  };

  
  return (
    
<div className="relative">
      <NavBar
        handleReset={handleReset}
        handleSearch={handleSearch}
        handleLogout={handleLogout}
        profileName={profileName}
      />
      <div className="pt-16">
        {/* Add padding top equal to the height of your navbar */}
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route
            exact
            path="/createTrainer"
            element={<CreateTrainer profileName={profileName} />}
          />
          <Route
            exact
            path="/trainers"
            element={
              <Trainers
                trainers={trainers}
                selectedTrainer={selectedTrainer}
                currentPage={currentPage}
                showModal={showModal}
                openModal={openModal}
                closeModal={closeModal}
                paginate={paginate}
                currentTrainers={currentTrainers}
                trainersPerPage={trainersPerPage}
                isReadOnly={isReadOnly}
                fieldChange={fieldChange}
                saveChanges={saveChanges}
                setSelectedTrainer={setSelectedTrainer}
              />
            }
          />
        </Routes>
      </div>
    </div>
   
    
    
  );
}

export default App;
