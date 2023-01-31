import {createSlice} from '@reduxjs/toolkit'

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        // reactions: {
        //     thumbsUp: 0,
        //     wow: 0,
        //     heart: 0,
        // }
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        // reactions: {
        //     thumbsUp: 0,
        //     wow: 0,
        //     heart: 0,
        // }
    }
]

export const postsSlice  = createSlice({
  name: 'posts',
  initialState,
  reducers:{
    postAdded: {
        reducer(state, action) {
            state.push(action.payload)
        },
  }
}
})
export const selectAllPosts = (state) => state.posts;

// export const {increment,decrement, reset, addIncrementAmount} = postsSlice.actions;
export const { postAdded } = postsSlice.actions

export default postsSlice.reducer;


