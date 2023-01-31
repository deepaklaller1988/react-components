import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsSlice from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsSlice,
  },
});
