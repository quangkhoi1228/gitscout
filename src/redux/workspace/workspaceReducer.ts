import { createSlice } from '@reduxjs/toolkit';
import useApi from 'hooks/useApi';
import { CompanyDataType } from 'types/CompanyDataType';
import { WorkspaceDataType } from 'types/WorkspaceDataType';

export interface WorkspaceState {
  value: CompanyDataType[];
}

const initialState: WorkspaceState = {
  value: [],
};

export const workspaceReducer = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    getAllWorkspace: (state) => {
      useApi.get('https://api.gitscrum.com/companies/', {
        authen: true,
        params: {
          search: '',
          page: 1,
        },
        onSuccess(res: WorkspaceDataType) {
          console.log(res);
        },
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAllWorkspace } = workspaceReducer.actions;

export default workspaceReducer.reducer;
