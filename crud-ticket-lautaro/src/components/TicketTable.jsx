import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteTicket } from '../features/ticketsSlice'
import {FiFilter} from 'react-icons/fi'
import TicketModal from './TicketModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export default function TicketTable() {
  const dispatch = useDispatch();

  /*
    const getToken = async () => {
      try{
        const response = await axios.post('https://plataform.crenein.com/api/login', {
          email: "pruebaLautaro",
          password: "pruebaLautaro",
        });
        console.log(response.data);
        setToken(response.data.token);
      }catch(error) {
        console.error(error);
      }
    }


    const getTickets = async () => {
      try{
        const response = await axios.get('https://lautaro.ispbrain.io:4443/api/v2/tickets?page[size]=10&page[number]=1', {
          headers: {
            Authorization: `Bearer ${getToken}`, // Asegúrate de que el token se pasa correctamente
          },
        });
        setTickets(response.data);        
      }catch(error) {
        console.error(error);
      }
    }

    useEffect(() => {
      getTickets();
    },[])
  */

  const tickets = useSelector((state) => state.tickets);  

  const [showTitleFilter, setShowTitleFilter] = useState(false); 
  const [showDescriptionFilter, setShowDescriptionFilter] = useState(false);
  const [showStateFilter, setShowStateFilter] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const [titleFilter, setTitleFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');  

  const [isModalOpen,setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});

  const [filteredTickets, setFilteredTickets] = useState([]);

  const [showRemoveFilter, setShowRemoveFilter] = useState(false);

  const handleModal = (ticket) => {     
    setIsModalOpen(!isModalOpen);
    setSelectedTicket(ticket);     
  }

  const handleDelete = (id) => {      
    dispatch(deleteTicket(id));
    setFilteredTickets(filteredTickets.filter(ticket => ticket.ticketId !== id));
    if(filteredTickets.length === 1) {
      setShowRemoveFilter(!showRemoveFilter);
    }
  }  

  const applyFilters = () => {
    setShowRemoveFilter(!showRemoveFilter);
    let newFilteredTickets = tickets;    
  
    if (titleFilter) {
      newFilteredTickets = newFilteredTickets.filter(ticket => ticket.ticketTitle.includes(titleFilter));
      setShowTitleFilter(!showTitleFilter);         
    }
  
    if (descriptionFilter) {
      newFilteredTickets = newFilteredTickets.filter(ticket => ticket.ticketDescription.includes(descriptionFilter));
      setShowDescriptionFilter(!showDescriptionFilter);          
    }
  
    if (stateFilter) {
      newFilteredTickets = newFilteredTickets.filter(ticket => ticket.ticketState === stateFilter); 
      setShowStateFilter(!showStateFilter);    
    }
  
    if (categoryFilter) {
      newFilteredTickets = newFilteredTickets.filter(ticket => ticket.ticketCategory === categoryFilter);  
      setShowCategoryFilter(!showCategoryFilter);    
    }
    
    if (newFilteredTickets.length === 0) {
      alert('No se encontraron tickets con los filtros seleccionados');
    }

    setFilteredTickets(newFilteredTickets);
  }

  const handleRemoveFilters = () => {    
    setShowRemoveFilter(!showRemoveFilter);
    setFilteredTickets([]);

    if (showTitleFilter) { 
      setTitleFilter('');
      setShowTitleFilter(!showTitleFilter);   
    }
    
    if (showDescriptionFilter) {
      setDescriptionFilter('');
      setShowDescriptionFilter(!showDescriptionFilter);
    }  

    if (showStateFilter) {
      setStateFilter('');
      setShowStateFilter(!showStateFilter);
    }

    if (showCategoryFilter) {      
      setCategoryFilter('');
      setShowCategoryFilter(!showCategoryFilter);
    }
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-2">
      <div className='flex flex-row bg-blue-800 border-b border-white'>
        {(showRemoveFilter ) && (
          <button onClick={handleRemoveFilters} className=" absolute focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium text-s rounded-lg m-4 p-2 w-44">
            <FontAwesomeIcon icon={faTrash} className='pr-4'/>
            Quitar filtros
          </button>
        )}
        <h3 className="text-3xl font-medium text-white w-full text-center py-4 ">Tickets</h3>
      </div>        
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-lg text-white uppercase bg-blue-800">
              <tr>
                  <th scope="col" className="px-6 py-3 border-r border-white">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3 border-r border-white relative">
                    <div className='flex flex-row space-x-4'>
                      <h1>Titulo</h1>
                      {showTitleFilter ? (
                        <div className='flex flex-row relative'>
                          <FiFilter className="mt-1 text-blue-400" onClick={() => setShowTitleFilter(!showTitleFilter)} />                          
                        </div>  
                      ) : (
                        <FiFilter className="mt-1" onClick={() => setShowTitleFilter(!showTitleFilter)} />
                      )} 
                    </div>                      
                      {showTitleFilter && (
                        <div className='flex flex-row bg-blue-800 space-x-4 text-white rounded absolute p-3 mt-4 -ml-6 items-center'>                        
                          <input type="text" className="text-black p-2 bg-gray-50 border border-gray-300 text-lg rounded-lg" value={titleFilter} onChange={event => setTitleFilter(event.target.value)} placeholder="Filtrar por titulo" />
                          <button onClick={applyFilters} className="bg-blue-500 text-white rounded h-10 p-2">Filtrar</button>                      
                        </div>
                      )}
                     
                  </th>
                  <th scope="col" className="px-6 py-3 border-r border-white">
                    <div className='flex flex-row space-x-4'>
                      <h1>Descripcion</h1>
                      {showDescriptionFilter ? (
                        <div className='flex flex-row relative'>
                          <FiFilter className="mt-1 text-blue-400" onClick={() => setShowDescriptionFilter(!showDescriptionFilter)} />                          
                        </div> 
                      ) : (                        
                        <FiFilter className="mt-1" onClick={() => setShowDescriptionFilter(!showDescriptionFilter)} />
                      )}                      
                    </div>
                    {showDescriptionFilter && (
                      <div className='flex flex-row bg-blue-800 space-x-4 text-white rounded absolute p-3 mt-4 -ml-6 items-center'>
                        <input type="text" className="text-black p-2 bg-gray-50 border border-gray-300 text-lg rounded-lg" value={descriptionFilter} onChange={(event) => setDescriptionFilter(event.target.value)} placeholder="Filtrar por descripcion" />
                        <button onClick={applyFilters} className="bg-blue-500 text-white rounded h-10 p-2">Filtrar</button>
                      </div>                      
                    )}  
                  </th>
                  <th scope="col" className="px-6 py-3 border-r border-white">
                    <div className='flex flex-row space-x-4'>
                      <h1>Estados</h1>
                      {showStateFilter ? (
                        <div className='flex flex-row relative' >
                          <FiFilter className="mt-1 text-blue-400" onClick={() => setShowStateFilter(!showStateFilter)} />                          
                        </div>                        
                      ) : (
                        <FiFilter className="mt-1" onClick={() => setShowStateFilter(!showStateFilter)} />
                      )}                      
                    </div>
                    {showStateFilter && (
                      <div className='flex flex-row bg-blue-800 space-x-4 text-white rounded absolute p-3 mt-4 -ml-6 items-center'>                                              
                        <select className="text-gray-400 p-2 bg-gray-50 border border-gray-300 text-lg rounded-lg" value={stateFilter} onChange={(event) => setStateFilter(event.target.value)}>
                          <option >Sin filtro</option>
                          <option >Abierto</option>
                          <option >Cerrado</option>                      
                        </select>
                        <button onClick={applyFilters} className="bg-blue-500 text-white rounded h-10 p-2">Filtrar</button>
                      </div> 
                    )}  
                  </th>
                  <th scope="col" className="px-6 py-3 border-r border-white">
                    <div className='flex flex-row space-x-4'>
                      <h1>Categorias</h1>
                      {showCategoryFilter ? (
                        <div>
                          <FiFilter className="mt-1 text-blue-400" onClick={() => setShowCategoryFilter(!showCategoryFilter)} />
                          
                        </div>                        
                      ) : (
                        <FiFilter className="mt-1" onClick={() => setShowCategoryFilter(!showCategoryFilter)} />
                      )}                      
                    </div>
                    {showCategoryFilter && (
                      <div className='flex flex-row bg-blue-800 space-x-4 text-white rounded absolute p-3 mt-4 -ml-6 items-center'>                        
                        <select className="text-gray-400 p-2 bg-gray-50 border border-gray-300 text-lg rounded-lg" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                          <option >Sin filtro</option>
                          <option >Soporte</option>
                          <option >Interno</option>
                          <option >Mudanza</option>
                          <option >Instalacion</option>                                            
                        </select>
                        <button onClick={applyFilters} className="bg-blue-500 text-white rounded h-10 p-2">Filtrar</button>
                      </div>                       
                    )} 
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Accion
                  </th>
              </tr>
          </thead>
          <tbody>                     
            {(filteredTickets.length >= 1 ? filteredTickets : tickets).map((ticket, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-lg text-gray-900 whitespace-nowrap">
                  {ticket.ticketId + 1}
                </th>
                <th scope="row" className="px-6 py-4 text-lg text-black">
                  {ticket.ticketTitle}
                </th>
                <td className="px-6 py-4 text-lg text-black">
                  {ticket.ticketDescription}
                </td>
                <td className="px-6 py-4 text-lg text-black">
                  {ticket.ticketState}
                </td>
                <td className="px-6 py-4 text-lg text-black">
                  {ticket.ticketCategory}
                </td>
                <td className="px-6 py-4 text-lg text-black">
                <div className='flex flex-row'>                  
                  <button type="button" onClick={()=>handleModal(ticket)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 focus:outline-none">
                    <FontAwesomeIcon icon={faPencilAlt}  className='pr-4'/>
                    Editar
                  </button>
                  <button onClick={()=>{handleDelete(ticket.ticketId)}} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2">
                    <FontAwesomeIcon icon={faTrash} className='pr-4'/>
                    Borrar
                  </button>
                </div>                
                </td>
              </tr>
            ))} 
                       
          </tbody>
      </table>
      {isModalOpen && (
        <TicketModal setIsModalOpen={setIsModalOpen} selectedTicket={selectedTicket} setSelectedTicket={setSelectedTicket} filteredTickets={filteredTickets} setFilteredTickets={setFilteredTickets}/>
      )}
    </div>
  )
}
