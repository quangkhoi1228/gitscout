import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LogTimeTrackingDataType } from 'types/LogTimeTrackingDataType';
import { LogTimeTrackingItemDataType } from 'types/LogTimeTrackingItemDataType';

export interface LogTimeTrackingState {
  value: LogTimeTrackingItemDataType[];
}

const initialState: LogTimeTrackingState = {
  value: [],
};

export const LogTimeTrackingReducer = createSlice({
  name: 'logTimeTracking',
  initialState,
  reducers: {
    setLogTimeTrackingData: (
      state,
      action: PayloadAction<LogTimeTrackingItemDataType[]>
    ) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogTimeTrackingData } = LogTimeTrackingReducer.actions;

export default LogTimeTrackingReducer.reducer;
