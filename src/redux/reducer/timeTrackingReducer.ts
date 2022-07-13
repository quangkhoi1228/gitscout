import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimeTrackingDataType } from 'types/TimeTrackingDataType';

export interface TimeTrackingState {
  value: TimeTrackingDataType | null;
}

const initialState: TimeTrackingState = {
  value: null,
};

export const timeTrackingReducer = createSlice({
  name: 'timeTracking',
  initialState,
  reducers: {
    setTimeTrackingLoading: (state, action: PayloadAction<boolean>) => {
      if (state.value) {
        state.value.loading = action.payload;
      }
    },
    setTimeTrackingData: (
      state,
      action: PayloadAction<TimeTrackingDataType>
    ) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTimeTrackingData, setTimeTrackingLoading } =
  timeTrackingReducer.actions;

export default timeTrackingReducer.reducer;
