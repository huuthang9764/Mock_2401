package MockProjectBackEnd.Form.MuaHangForms.ChiTietDonHang;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CTDHCreateForm {

    @NotNull(message = "Bạn không thể để trống mã sản phẩm !!")
    private Integer maSanPham;

    @NotNull(message = "Bạn không thể để trống dơn giá !!")
    private Integer donGia;

    @NotNull(message = "Bạn không thể để trống mã số lượng !!")
    private Integer soLuong;

    @NotNull(message = "Bạn không thể để trống thành tiền !!")
    private Integer thanhTien;

}
