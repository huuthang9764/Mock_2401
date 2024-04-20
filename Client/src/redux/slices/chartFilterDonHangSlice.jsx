import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    label: ["Chờ Duyệt", "Đã Duyệt", "Hủy", "Đang Giao", "Giao Thành Công"],
    startDate: Date.now() - 30 * 24 * 60 * 60 * 1000, 
    endDate: Date.now(),
    dayTime: [],
};

const chartFilterDonHangSlice = createSlice({
    name: 'chartFilterDonHang',
    initialState,
    reducers: {
        labelShow: (state, action) => {
            if (action.payload !== "") {
                if (Array.isArray(action.payload)) {
                    state.label = action.payload;
                } else {
                    state.label = [action.payload];
                }
            } else {
                state.label = initialState.label;
            }
        },
        setDayTime: (state, action) => {
            if (action.payload !== "") {
                const { startDate, endDate } = action.payload;
                state.startDate = action.payload.startDate;
                state.endDate = action.payload.endDate;
                const dayTime = [];
                const currentDate = new Date(startDate);
                const endDateTime = new Date(endDate);
                const dateFormatOptions = { day: 'numeric', month: 'numeric' };
                const dateFormat = new Intl.DateTimeFormat('en-US', dateFormatOptions);
                while (currentDate <= endDateTime) {
                    const formattedDate = dateFormat.format(currentDate);
                    dayTime.push(formattedDate);
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                state.dayTime = dayTime;
            } else {
                const defaultDayTime = [];
                const defaultCurrentDate = new Date(initialState.startDate);
                const defaultEndDateTime = new Date(initialState.endDate);
                const dateFormatOptions = { day: 'numeric', month: 'numeric' };
                const dateFormat = new Intl.DateTimeFormat('en-US', dateFormatOptions);
                while (defaultCurrentDate <= defaultEndDateTime) {
                    const formattedDate = dateFormat.format(defaultCurrentDate);
                    defaultDayTime.push(formattedDate);
                    defaultCurrentDate.setDate(defaultCurrentDate.getDate() + 1);
                }
                state.dayTime = defaultDayTime;
            }
        },
    },
    }
);

export const { labelShow, setDayTime } = chartFilterDonHangSlice.actions;
export default chartFilterDonHangSlice.reducer;
