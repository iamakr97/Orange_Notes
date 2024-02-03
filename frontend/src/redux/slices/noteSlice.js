import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
    name: "note",
    initialState: {
        title: null,
        description: null
    },
    reducers: {
        setNoteData: (state, actions) => {
            state.title = actions.payload.title;
            state.description = actions.payload.description;
        }
    }
})

export const { setNoteData } = noteSlice.actions;
export default noteSlice.reducer;