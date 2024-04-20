package MockProjectBackEnd.DTO.MuaHangDTOs;

import MockProjectBackEnd.Entity.MuaHangEntities.GioHang;
import MockProjectBackEnd.Entity.SanPhamEntities.SanPham;
import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GioHangDTO {

    @JsonProperty("maSanPham")
    private String sanPhamMaSanPham;

    @JsonProperty("tenSanPham")
    private String sanPhamTenSanPham;

    private String anhMinhHoa;

    private Integer donGia;

    private Integer soLuong;

    private Integer thanhTien;

}
