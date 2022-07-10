import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter/counterReducer';
import workspaceReducer from './workspace/workspaceReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    workspace: workspaceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
