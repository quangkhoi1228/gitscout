import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkspaceDataType } from 'types/WorkspaceDataType';

export interface WorkspaceState {
  value: WorkspaceDataType | null;
}

const initialState: WorkspaceState = {
  value: null,
};

export const workspaceReducer = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspaceData: (state, action: PayloadAction<WorkspaceDataType>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWorkspaceData } = workspaceReducer.actions;

export default workspaceReducer.reducer;
