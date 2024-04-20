import React, { useEffect, useState } from "react";
import {
    TextField,
    InputAdornment,
    FormControl, NativeSelect
} from "@mui/material";
import "chart.js/auto";
import { useDispatch } from "react-redux";
import { labelShow as labelShowDonHang} from "../../../redux/slices/chartFilterDonHangSlice"
import { setDayTime as setDayTimeDonHang } from "../../../redux/slices/chartFilterDonHangSlice"


const BoLocDonHang = (props) => {
    const [selectedState, setSelectedState] = useState("");
    const [startDate, setStartDate] = useState(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    const [endDate, setEndDate] = useState(new Date());
    
    const [isVisible, setIsVisible] = useState(true);

    const handleChangeState = (event) => {
        setSelectedState(event.target.value);
    };

    const handleChangeStartDate = (event) => {
        setStartDate(event.target.value);
    };

    const handleChangeEndDate = (event) => {
        setEndDate(event.target.value);
    };

    useEffect(() => {
        setIsVisible(props.filterVisible)
    }, []);

    const dispatch = useDispatch();
    
    //Đơn hàng
    useEffect(() => {
        dispatch(labelShowDonHang(selectedState));
        dispatch(setDayTimeDonHang({ startDate: startDate, endDate: endDate }));
    }, [dispatch, selectedState, startDate, endDate]);

    return (
        <div style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
            {isVisible && (
                <div style={{ paddingLeft: "5px", paddingRight: "5px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <FormControl>
                        <div style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                            <p style={{ marginRight: "10px", marginTop: "8px" }}>Trạng Thái:</p>
                            <NativeSelect
                                value={selectedState}
                                onChange={handleChangeState}
                                inputProps={{
                                    name: 'statusFilter',
                                    id: 'statusFilter',
                                }}
                            >
                                <option value="">Tất cả</option>
                                <option value="Chờ Duyệt">Chờ Duyệt</option>
                                <option value="Đã Duyệt">Đã Duyệt</option>
                                <option value="Hủy">Hủy</option>
                                <option value="Đang Giao">Đang Giao</option>
                                <option value="Giao Thành Công">Giao Thành Công</option>
                            </NativeSelect>
                        </div>
                    </FormControl>
                </div>
            )}

            <div style={{ marginLeft: "20px" }}>
                <TextField
                    label="Ngày bắt đầu"
                    type="date"
                    size="small"
                    value={startDate}
                    onChange={handleChangeStartDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <svg
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17 14h-1V7h-1v7h-1l2 2 2-2zm-5 5h6v-1h-6v1zm4.293-10.707l.707-.707-4.5-4.5-.707.707 4.5 4.5zm-9.586 9.586l-.707.707 4.5 4.5.707-.707-4.5-4.5zm4.293.707l4.5-4.5-.707-.707-4.5 4.5.707.707zM12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"
                                        fill="#757575"
                                    />
                                </svg>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    style={{ marginLeft: "20px" }}
                    label="Ngày kết thúc"
                    type="date"
                    size="small"
                    value={endDate}
                    onChange={handleChangeEndDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <svg
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M17 14h-1V7h-1v7h-1l2 2 2-2zm-5 5h6v-1h-6v1zm4.293-10.707l.707-.707-4.5-4.5-.707.707 4.5 4.5zm-9.586 9.586l-.707.707 4.5 4.5.707-.707-4.5-4.5zm4.293.707l4.5-4.5-.707-.707-4.5 4.5.707.707zM12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"
                                        fill="#757575"
                                    />
                                </svg>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </div>
    );
};

export default BoLocDonHang;
