import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    interviews: JSON.parse(localStorage.getItem('interviews')) || [],
    interviewers: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Mike Johnson' },
    ],
    interviewTypes: ['Technical', 'HR', 'Behavioral'],
};

const interviewSlice = createSlice({
    name: 'interviews',
    initialState,
    reducers: {
        addInterview: (state, action) => {
            state.interviews.push(action.payload);
            localStorage.setItem('interviews', JSON.stringify(state.interviews));
        },
        updateInterview: (state, action) => {
            const index = state.interviews.findIndex(
                (interview) => interview.id === action.payload.id
            );
            if (index !== -1) {
                state.interviews[index] = action.payload;
                localStorage.setItem('interviews', JSON.stringify(state.interviews));
            }
        },
        deleteInterview: (state, action) => {
            state.interviews = state.interviews.filter(
                (interview) => interview.id !== action.payload
            );
            localStorage.setItem('interviews', JSON.stringify(state.interviews));
        },
    },
});

export const { addInterview, updateInterview, deleteInterview } = interviewSlice.actions;
export default interviewSlice.reducer; 