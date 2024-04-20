import React, { useEffect, useState } from "react";
import {
    TextField,
    InputAdornment,
    FormControl, NativeSelect
} from "@mui/material";
import "chart.js/auto";
import { useDispatch } from "react-redux";
import { labelShow as labelShowNguoiDungMoi } from "../../../redux/slices/chartFilterNguoiDungMoiSlice"
import { setDayTime as setDayTimeNguoiDungMoi } from "../../../redux/slices/chartFilterNguoiDungMoiSlice"


const BoLocNguoiDungMoi = (props) => {
    const [selectedState, setSelectedState] = useState("");
    const [startDate, setStartDate] = useState("2024-01-01");
    const [endDate, setEndDate] = useState(new Date());

    const [isVisible, setIsVisible] = useState(true);

    const handleChangeState = (event) => {
        setSelectedState(event.target.value);
    };

    useEffect(() => {
        setIsVisible(props.filterVisible)
    }, []);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(labelShowNguoiDungMoi(selectedState));
        dispatch(setDayTimeNguoiDungMoi({ startDate: startDate, endDate: endDate }));
    }, [dispatch, selectedState, startDate, endDate]);

    return (
        <div style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
            {isVisible && (
                <div style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <FormControl>
                        <div style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                            <p style={{ marginRight: "10px", marginTop: "8px" }}>Giới Tính:</p>
                            <NativeSelect
                                value={selectedState}
                                onChange={handleChangeState}
                                inputProps={{
                                    name: 'statusFilter',
                                    id: 'statusFilter',
                                }}
                            >
                                <option value="">Tất cả</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </NativeSelect>
                        </div>
                    </FormControl>
                </div>
            )}
        </div>
    )
}

export default BoLocNguoiDungMoi;
