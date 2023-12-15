import { createSlice } from "@reduxjs/toolkit";

export const ticketsSlice = createSlice({
    name: "tickets",
    initialState: [],
    reducers: {
        addTicket: (state, action) => {
            state.push(action.payload)
        },
        deleteTicket: (state, action) => {                    
            return state.filter(ticket => ticket.ticketId !== action.payload)
        },
        editTicket: (state, action) => {                                       
            const {id, ticket} = action.payload;
            state[id] = ticket;
        }
    }
})

export const {addTicket, deleteTicket, editTicket} = ticketsSlice.actions;
export default ticketsSlice.reducer;