package MockProjectBackEnd.Services.ThongKeServices;

import MockProjectBackEnd.DTO.ThongKeDTOs.DonHang.ThongKeDonHangDTO;
import MockProjectBackEnd.DTO.ThongKeDTOs.ThongKeTongQuatDTO;
import MockProjectBackEnd.Form.MuaHangForms.DonHang.DonHangFillerForm;

import java.util.List;

public interface IThongKeService {

    ThongKeTongQuatDTO thongKeTongQuat();

    List<ThongKeDonHangDTO> thongKeDonHang(DonHangFillerForm form);

}
