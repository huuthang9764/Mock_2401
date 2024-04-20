package MockProjectBackEnd.Form.MuaHangForms.GioHang;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class GioHangUpdateForm {

    @NotNull(message = "Không được để trống mã tài khoản !!")
    private Integer maTaiKhoan;

    @NotNull(message = "Không được để trống mã sản phẩm !!")
    private Integer maSanPham;

    @PositiveOrZero(message = "Đơn giá không được bé hơn 0 !!")
    private Integer donGia;

    @Positive(message = "Số lượng không được bé hơn hoặc bằng 0 !!")
    private Integer soLuong;

    @PositiveOrZero(message = "Thành tiền không được bé hơn 0 !!")
    private Integer thanhTien;
}
