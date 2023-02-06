import {createSlice, nanoid} from '@reduxjs/toolkit'

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: "I've heard good things.",
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
        }
    },
    {
        id: '2',
        title: 'Slices...',
        content: "The more I say slice, the more I want pizza.",
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
        }
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
        prepare(title,content, userId){
            return{
                payload:{
                    id: nanoid(),
                    title,
                    content,
                    userId,
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                    }
                }
            }
        }
  },
  reactionAdded(state,action){
    const { postId, reaction} = action.payload
    const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
  }
}
})
export const selectAllPosts = (state) => state.posts;

// export const {increment,decrement, reset, addIncrementAmount} = postsSlice.actions;
export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer;


