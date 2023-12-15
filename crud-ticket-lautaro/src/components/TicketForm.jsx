import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTicket } from '../features/ticketsSlice'
import axios from 'axios';

export default function ticketForm() {


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

  useEffect(() => {
    getToken();
  },[])

  const [token, setToken] = useState('');
  */


  const dispatch = useDispatch();

  const [id, setId] = useState(0);

  const [title , setTitle] = useState('');
  const [description , setDescription] = useState('');
  const [selectedState , setSelectedState] = useState('Estados');
  const [selectedCategory , setSelectedCategory] = useState('Categorias');  

  const [isOpenState, setIsOpenState] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);    

  const toggleDropdownState = () => {
    setIsOpenState(!isOpenState);    
  };

  const toggleDropdownCategories = () => {
    setIsOpenCategory(!isOpenCategory);    
  };

  const handleSelectState = (value) => {
    setSelectedState(value);
    setIsOpenState(false);
  }
  
  const handleSelectCategory = (value) => {
    setSelectedCategory(value);
    setIsOpenCategory(false);
  }

  const handleSubmit = (e) => {
    if(selectedState === 'Estados' || selectedCategory === 'Categorias') {
      alert('Por favor, seleccione un estado y una categoria');
      return;
    }    

    e.preventDefault();

    /*
    const createTicket = async () => {
      try{
        const response = await axios.post('https://lautaro.ispbrain.io:4443/api/v2/tickets', {
          {
            title: title,
            description: description,
            status_id: selectedState, -Deberia ser un numero ya que los estados se indexan por numero
            category_id: selectedCategory, -Deberia ser un numero ya que las categorias se indexan por numero
            spaces: selectedSpace, -Para este campo faltaria el input en el formulario                
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        });
        console.log(response.data);        
      }catch(error) {
        console.error(error);
      }
    }
    */

    const newTicket = {
      ticketId: id,
      ticketTitle: title,
      ticketDescription: description,
      ticketState: selectedState,
      ticketCategory: selectedCategory,
    }   
    
    dispatch(addTicket(newTicket));
    
    setId(id + 1);
    setTitle('');
    setDescription('');
    setSelectedState('Estados');
    setSelectedCategory('Categorias');
  }    

  return (
    <div className="flex flex-col items cente">      
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6 bg-blue-200 w-full pb-8" action="#">
          <h1 className="text-4xl font-medium bg-blue-700 text-white w-full text-center py-4">Agregar Ticket</h1>
          <div className="flex flex-row items-start">            
            <div className="flex flex-col space-y-1">  
              <label htmlFor="title" className="block text-xl font-medium text-blue-800 py-2">Titulo *</label>                          
              <input onChange={(event)=> setTitle(event.target.value)} value= {title} type="text" id="title" className="bg-gray-50 border rounded border-gray-300 text-xl w-96 p-4" required/>
              <label htmlFor="description" className="block text-xl font-medium text-blue-800 py-2">Descripcion *</label>
              <textarea onChange={(event)=> setDescription(event.target.value)} value={description} type="text" id="description" className="bg-gray-50 border rounded border-gray-300 text-xl w-96 p-4" required/>
            </div>
          </div>  
          <div className="flex flex-row space-x-16">
            <div className="relative">     
              <button onClick={toggleDropdownState} id="dropdownDefaultButton" data-dropdown-toggle="stateDropdown" className="text-blue-800 w-44 bg-white hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl p-5 text-center inline-flex items-center" type="button">{selectedState} *
                <svg className="w-2.5 h-2.5 ms-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">          
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              <div id="stateDropdown" className={`absolute mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${isOpenState ? "block": "hidden"}`}>
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <a onClick={()=>handleSelectState('Abierto')} href="#" className="block px-4 py-2 hover:bg-gray-100">Abierto</a>
                    <a onClick={()=>handleSelectState('Cerrado')} href="#" className="block px-4 py-2 hover:bg-gray-100">Cerrado</a>
                  </li>
                </ul>              
              </div>
            </div>  
            <div className="relative"> 
              <button onClick={toggleDropdownCategories} id="dropdownDefaultButton" data-dropdown-toggle="categoriesDropdown" className="text-blue-800 w-44 bg-white hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl p-5 text-center inline-flex items-center" type="button">{selectedCategory} *
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">          
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </button>
              <div id="categoriesDropdown" className={`absolute mt-2 z-10 bg-white divide-ydivide-gray-100 rounded-lg shadow w-44 ${isOpenCategory ? "block": "hidden"}`}>
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <a onClick={()=>handleSelectCategory("Soporte")} href="#" className="block px-4 py-2 hover:bg-gray-100">Soporte</a>
                    <a onClick={()=>handleSelectCategory("Interno")} href="#" className="block px-4 py-2 hover:bg-gray-100">Interno</a>
                    <a onClick={()=>handleSelectCategory("Mudanza")} href="#" className="block px-4 py-2 hover:bg-gray-100">Mudanza</a>
                    <a onClick={()=>handleSelectCategory("Instalacion")} href="#" className="block px-4 py-2 hover:bg-gray-100">Instalacion</a>
                  </li>
                </ul>              
              </div>
            </div>
          </div>               
          <button type="submit" className="text-white bg-blue-700 border border-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-20 py-5 text-center me-2 mb-2 t">Cargar Ticket</button>        
        </form>        
    </div>  
  )
}
