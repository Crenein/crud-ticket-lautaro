import React from 'react'
import { useDispatch } from 'react-redux';
import { editTicket } from '../redux/slices/ticketsSlice';


export default function TicketModal({setIsModalOpen,selectedTicket,setSelectedTicket, filteredTickets ,setFilteredTickets}) {
    const dispatch = useDispatch();

    const handleClose = () => {     
        setIsModalOpen(false);    
    }

    const handleEditTitle = (value) => {
        setSelectedTicket(prevState => ({
            ...prevState,
            ticketTitle: value
        }));
    }

    const handleEditDescription = (value) => {
        setSelectedTicket(prevState => ({
            ...prevState,
            ticketDescription: value
        }));
    }

    const handleEditState = (value) => {
        setSelectedTicket(prevState => ({
            ...prevState,
            ticketState: value
        }));
    }

    const handleEditCategory = (value) => {
        setSelectedTicket(prevState => ({
            ...prevState,
            ticketCategory: value
        }));
    }

    const handleEditTicket = () => {              
        dispatch(editTicket({id: selectedTicket.ticketId, ticket: selectedTicket}));
        setFilteredTickets(filteredTickets.filter(ticket => ticket.ticketId !== selectedTicket.ticketId));
        setIsModalOpen(false);
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">            
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 max-w-2xl w-full">
                        <div className="bg-white px-4 pt-5 pb-4">              
                            <div className="mt-3 text-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Editar Ticket
                                </h3>
                            </div>              
                        </div>
                        <div className='flex flex-row'>
                            <label htmlFor="title" className="text-lg font-medium text-gray-900 justify-center ml-4 mt-2">Titulo</label>
                            <input 
                                id='title'
                                type="text"
                                onChange={(event)=> handleEditTitle(event.target.value)} 
                                value={selectedTicket.ticketTitle}                             
                                className="bg-gray-100 border border-gray-300 text-lg rounded-lg w-9/12 ml-20 p-3" 
                            
                            />
                        </div><div className='flex flex-row mt-4'>
                            <label htmlFor="description" className="text-lg font-medium text-gray-900 ml-4 mt-2">Descripcion</label>
                            <input 
                                id='description'
                                type="text"
                                onChange={(event)=> handleEditDescription(event.target.value)}  
                                value={selectedTicket.ticketDescription}                             
                                className="bg-gray-100 border border-gray-300 text-lg rounded-lg w-9/12 ml-8 p-3" 
                            
                            />
                        </div>
                        <div className='flex flex-row mt-8'>
                            <label htmlFor="states" className="text-lg font-medium text-gray-900 justify-center ml-4 mt-2">Estado</label>
                            <select id="states" onChange={(event)=>handleEditState(event.target.value)} className="bg-gray-100 border text-lg ml-4 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-4/12 p-3">

                                <option>Abierto</option>
                                <option>Cerrado</option>
                                
                            </select>  
                            <label htmlFor="categories" className="text-lg font-medium text-gray-900 justify-center ml-5 mt-2">Categorias</label>
                            <select id="categories" onChange={(event)=>handleEditCategory(event.target.value)} className="bg-gray-100 border text-lg ml-4 border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-4/12 p-3">

                                <option>Soporte</option>
                                <option>Interno</option>
                                <option>Mudanza</option>
                                <option>Instalacion</option>
                                
                            </select>  
                        </div>        
                    <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse">
                        <button 
                            type="button" 
                            onClick={handleClose} 
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-red-300 ml-3 w-auto"
                        >
                            Cerrar
                        </button>
                        <button 
                            type="button" 
                            onClick={handleEditTicket} 
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-3 w-auto"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>     
    ) 
}


