import React, {useState} from 'react';
import { Card, Button, Modal, Row, Col, Pagination } from 'react-bootstrap';
import { format } from 'date-fns';


const Trainers = ({ trainers, setSelectedTrainer, selectedTrainer, showModal, openModal, closeModal, paginate, currentTrainers, trainersPerPage, currentPage, isReadOnly, fieldChange, saveChanges}) => {

  const StarRating = ({ ratings }) => {
    return (
      <div>
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={`fa ${index + 1 <= ratings ? 'fa-star' : 'fa-star-o'}`}
          ></span>
        ))}
      </div>
    );
  };

  const pageNumbers = [];
  const totalPages = Math.ceil(trainers.length / trainersPerPage);

  // Calculate the start page and end page based on current page
  let startPage, endPage;
  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= 3) {
    startPage = 1;
    endPage = 5;
  } else if (currentPage + 2 >= totalPages) {
    startPage = totalPages - 4;
    endPage = totalPages;
  } else {
    startPage = currentPage - 2;
    endPage = currentPage + 2;
  }

  // Generate page numbers within the range
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-3">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {currentTrainers.map((trainer) => (
        <div key={trainer.id} className="border border-gray-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold">{trainer.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{trainer.experience} Years</p>
          <p className="text-sm text-gray-600 mb-2">INR {trainer.commercialsPerHour} / Hour</p>
          <p className="text-sm text-gray-600 mb-2 overflow-hidden line-clamp-2">{trainer.skills}</p>
          <StarRating ratings={trainer.ratings} />
          <div className="mt-4">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={() => openModal(trainer)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-8 flex justify-center">
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className={number === currentPage ? 'active' : ''}>
              <a
                href="#"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-300"
                onClick={() => paginate(number)}
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <Modal show={showModal} onHide={closeModal} dialogClassName="modal-xl">
    <Modal.Header closeButton className="bg-slate-600 text-white">
    <Modal.Title className="flex items-center">
      <span className="mr-4">{selectedTrainer ? selectedTrainer.name : ''}</span>
      {isReadOnly ? (
        <i className="far fa-edit cursor-pointer" onClick={fieldChange}></i>
      ) : (
        <i className="far fa-save cursor-pointer" onClick={() => saveChanges(selectedTrainer)}></i>
      )}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body className="bg-slate-100">
    {selectedTrainer && (
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="commercialsPerHour" className="block text-sm font-medium text-gray-700">Commercials Per Hour:</label>
            <input type="number" name="commercialsPerHour" className="form-input mt-1 block w-full rounded-md border-gray-300 bg-white text-slate-900 p-1" readOnly={isReadOnly} value={selectedTrainer.commercialsPerHour} onChange={(e) => setSelectedTrainer({ ...selectedTrainer, commercialsPerHour: e.target.value })} />
          </div>
          <div className="mb-4">
            <label htmlFor="commercialsPerDay" className="block text-sm font-medium text-gray-700">Commercials Per Day:</label>
            <input type="number" name="commercialsPerDay" className="form-input mt-1 block w-full rounded-md border-gray-300 bg-white text-slate-900 p-1" readOnly={isReadOnly} value={selectedTrainer.commercialsPerDay} onChange={(e) => setSelectedTrainer({ ...selectedTrainer, commercialsPerDay: e.target.value })}/>
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
            <input type="text" name="location" value={selectedTrainer.location} className="form-input mt-1 block w-full rounded-md border-gray-300 bg-white text-slate-900 p-1" readOnly={isReadOnly} onChange={(e) => setSelectedTrainer({ ...selectedTrainer, location: e.target.value })} />
          </div>
          <div className="mb-4">
            <label htmlFor="linkToPdf" className="block text-sm font-medium text-gray-700">Link To Pdf:</label>
            <div className="flex">
              <input type="text" name="linkToPdf" className="form-input mt-1 flex-1 rounded-md border-gray-300 p-1" readOnly={isReadOnly} value={selectedTrainer.linkToPdf} onChange={(e) => setSelectedTrainer({ ...selectedTrainer, linkToPdf: e.target.value })} />
              <span className="input-group-text">
                <a href={selectedTrainer.linkToPdf} target="_blank" rel="noopener noreferrer" className='fa-solid fa-globe btn'></a>
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="ratings" className="block text-sm font-medium text-gray-700">Ratings:</label>
            <input type="number" name="ratings" value={selectedTrainer.ratings} onChange={(e) => setSelectedTrainer({ ...selectedTrainer, ratings: e.target.value })} className="form-input mt-1 block w-full rounded-md border-gray-300 bg-white text-slate-900 p-1" readOnly={isReadOnly} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <div className="flex">
              <input type="email" name="email" value={selectedTrainer.email} className="form-input mt-1 flex-1 rounded-md border-gray-300 p-1" readOnly={isReadOnly} onChange={(e) => setSelectedTrainer({ ...selectedTrainer, email: e.target.value })}/>
              <span className="input-group-text">
                <a href={`mailto:${selectedTrainer.email}`} target="_blank" rel="noopener noreferrer" className='fa-solid fa-envelope btn'></a>
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="alternateEmail" className="block text-sm font-medium text-gray-700">Alternate Email:</label>
            <div className="flex">
              <input type="email" name="alternateEmail" value={selectedTrainer.alternateEmail} onChange={(e) => setSelectedTrainer({ ...selectedTrainer, alternateEmail: e.target.value })} className="form-input mt-1 flex-1 rounded-md border-gray-300 p-1" readOnly={isReadOnly}/>
              <span className="input-group-text">
                <a href={`mailto:${selectedTrainer.alternateEmail}`} target="_blank" rel="noopener noreferrer" className='fa-solid fa-envelope btn'></a>
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Whatsapp Number:</label>
            <div className="flex">
              <input type="text" name="phoneNumber" value={selectedTrainer.phoneNumber} onChange={(e) => setSelectedTrainer({ ...selectedTrainer, phoneNumber: e.target.value })} className="form-input mt-1 flex-1 rounded-md border-gray-300 p-1" readOnly={isReadOnly}/>
              <span className="input-group-text">
                <a href={`https://wa.me/+91${selectedTrainer.phoneNumber}`} target="_blank" rel="noopener noreferrer" className='fa-brands fa-whatsapp btn'></a>
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="alternateNumber" className="block text-sm font-medium text-gray-700">Alternate Number:</label>
            <input type="text" name="alternateNumber" value={selectedTrainer.alternateNumber} onChange={(e) => setSelectedTrainer({ ...selectedTrainer, alternateNumber: e.target.value })} className="form-input mt-1 block w-full rounded-md border-gray-300 bg-white text-slate-900 p-1" readOnly={isReadOnly} />
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills:</label>
            <textarea name="skills" className="form-input mt-1 block w-full rounded-md border-gray-300 bg-white text-slate-900 p-1 line-clamp-2" onChange={(e) => setSelectedTrainer({ ...selectedTrainer, skills: e.target.value })} readOnly={isReadOnly}>{selectedTrainer.skills}</textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience (in Yrs):</label>
            <input type="text" name="experience" value={selectedTrainer.experience} className="form-input mt-1 block w-full rounded-md border-gray-300 bg-white text-slate-900 p-1" readOnly={isReadOnly} onChange={(e) => setSelectedTrainer({ ...selectedTrainer, experience: e.target.value })}/>
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes:</label>
            <textarea name="notes" className="form-input mt-1 block w-full rounded-md border-gray-300 bg-white text-slate-900 p-1" readOnly={isReadOnly} onChange={(e) => setSelectedTrainer({ ...selectedTrainer, notes: e.target.value })}>{selectedTrainer.notes}</textarea>
          </div>
        </div>
        <p className='text-sm text-gray-600 mt-3'>Created By: {selectedTrainer.username}</p>
        <p className='text-sm text-gray-600'>Created on: {format(new Date(selectedTrainer.createdAt), 'dd-MM-yyyy')}</p>
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={closeModal}>Close</Button>
  </Modal.Footer>
</Modal>



    </div>
  );
};

export default Trainers;
