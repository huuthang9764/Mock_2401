import React, { useEffect, useState } from "react";
import { subMonths, startOfMonth, endOfMonth, subYears } from 'date-fns';
import {
    FormControl, NativeSelect
} from "@mui/material";
import "chart.js/auto";
import { useDispatch } from "react-redux";
import { labelShow as labelShowDoanhThu} from "../../../redux/slices/chartFilterDoanhThuSlice"
import { setDayTime as setDayTimeDoanhThu } from "../../../redux/slices/chartFilterDoanhThuSlice"


const BoLocDoanhThu = (props) => {
    const [selectedState, setSelectedState] = useState("");
    const [startDate, setStartDate] = useState(startOfMonth(new Date()));
    const [endDate, setEndDate] = useState(new Date());
    
    const [isVisible, setIsVisible] = useState(true);

    const handleChangeState = (event) => {
        setSelectedState(event.target.value);
        switch (event.target.value) {
          case "Tháng hiện tại": {
            const startDate = startOfMonth(new Date());
            const endDate = endOfMonth(new Date());
            setStartDate(startDate);
            setEndDate(endDate);
            break;
          }
          case "Tháng Trước": {
            const startDate = startOfMonth(subMonths(new Date(), 1));
            const endDate = endOfMonth(subMonths(new Date(), 1));
            setStartDate(startDate);
            setEndDate(endDate);
            break;
          }
          case "Năm Hiện Tại": {
            const startDate = startOfMonth(new Date());
            const endDate = endOfMonth(new Date());
            setStartDate(startDate);
            setEndDate(endDate);
            break;
          }
          case "Năm Trước": {
            const startDate = startOfMonth(subYears(new Date(), 1));
            const endDate = endOfMonth(subYears(new Date(), 1));
            setStartDate(startDate);
            setEndDate(endDate);
            break;
          }
          default:
            break;
        }
      };

    useEffect(() => {
        setIsVisible(props.filterVisible)
    }, []);

    const dispatch = useDispatch();
    //Đơn hàng
    useEffect(() => {
        dispatch(labelShowDoanhThu(selectedState));
        dispatch(setDayTimeDoanhThu({ startDate: startDate, endDate: endDate }));
    }, [dispatch, selectedState, startDate, endDate]);

    return (
        <div style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
            {isVisible && (
                <div style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <FormControl>
                        <div style={{ textAlign: "right", display: "flex", justifyContent: "flex-end" }}>
                            <p style={{ marginRight: "10px", marginTop: "8px" }}>Khoảng thời gian:</p>
                            <NativeSelect
                                value={selectedState}
                                onChange={handleChangeState}
                                inputProps={{
                                    name: 'statusFilter',
                                    id: 'statusFilter',
                                }}
                            >
                                <option value="Tháng Hiện Tại">Tháng Hiện Tại</option>
                                <option value="Tháng Trước">Tháng Trước</option>
                                <option value="Năm Hiện Tại">Năm Hiện Tại</option>
                                <option value="Năm Trước">Năm Trước</option>
                            </NativeSelect>
                        </div>
                    </FormControl>
                </div>
            )}
            </div>
    );
};

export default BoLocDoanhThu;
