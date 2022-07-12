import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimeTrackingDataType } from 'types/TimeTrackingDataType';
import TimeTrackingResponse from 'types/TimeTrackingResponse';

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
    setTimeTrackingData: (
      state,
      action: PayloadAction<TimeTrackingResponse>
    ) => {
      console.log(action.payload);
      state.value = {
        startDate: action.payload.resume.period_start,
        endDate: action.payload.resume.period_end,
        value: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTimeTrackingData } = timeTrackingReducer.actions;

export default timeTrackingReducer.reducer;
