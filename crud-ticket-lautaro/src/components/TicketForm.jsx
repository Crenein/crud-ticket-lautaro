import React from 'react'
import { useState } from 'react'

export default function ticketForm() {
    const [isOpenState, setIsOpenState] = useState(false);
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    
    const [selectedState , setSelectedState] = useState('Estados');
    const [selectedCategory , setSelectedCategory] = useState('Categorias');
    
  
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
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const state = selectedState;
      const category = selectedCategory;
      const ticket = {title, description, state, category};
      console.log(ticket);
    }    

    return (
        <div className="flex flex-col items-center">      
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6 bg-blue-200 w-full pb-8" action="#">
                <h1 className="text-4xl font-medium bg-blue-700 text-white w-full text-center py-4">Agregar Ticket</h1>
                <div className="flex flex-row items-center justify-center mb-5">
                <label htmlFor="title" className="block mb-2 text-lg font-medium text-gray-900 pr-8">Titulo *</label>
                <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-lg rounded-lg block p-4" required/>
                </div>
                <div className="flex flex-row items-center justify-center mb-5 pr-5">
                <label htmlFor="description" className="block mb-2 text-lg font-medium text-gray-900 pr-2">Descripcion *</label>
                <textarea type="text" id="description" className="bg-gray-50 border border-gray-300 text-lg rounded-lg block p-4" required/>
                </div>
                <div className="flex flex-row space-x-16">
                <div className="relative">     
                    <button onClick={toggleDropdownState} id="dropdownDefaultButton" data-dropdown-toggle="stateDropdown" className="text-blue-700 bg-white hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg p-5 text-center inline-flex items-center" type="button">{selectedState} *
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">          
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
                    <button onClick={toggleDropdownCategories} id="dropdownDefaultButton" data-dropdown-toggle="categoriesDropdown" className="text-blue-700 bg-white hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg p-5 text-center inline-flex items-center" type="button">{selectedCategory} *
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">          
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>
                    <div id="categoriesDropdown" className={`absolute mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ${isOpenCategory ? "block": "hidden"}`}>
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
                <button type="submit" className="text-white bg-blue-700 border border-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-20 py-5 text-center me-2 mb-2 t">Cargar Ticket</button>        
            </form>        
        </div>  
    )
}
