package MockProjectBackEnd.DTO.ThongKeDTOs.DonHang;

import MockProjectBackEnd.Entity.MuaHangEntities.TrangThai;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ThongKeDonHangChiTietDTO {

    private TrangThai trangThai;

    private Integer soLuong;

}