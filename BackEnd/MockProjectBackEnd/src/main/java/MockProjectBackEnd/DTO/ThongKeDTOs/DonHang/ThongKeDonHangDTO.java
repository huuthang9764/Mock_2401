package MockProjectBackEnd.DTO.ThongKeDTOs.DonHang;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class ThongKeDonHangDTO {

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate ngayDatDon;

    private List<ThongKeDonHangChiTietDTO> danhSachTrangThaiVaSoLuong;

//    private List<ThongKeDonHangChiTietDTO> doanhThuTheoNgay;

}
