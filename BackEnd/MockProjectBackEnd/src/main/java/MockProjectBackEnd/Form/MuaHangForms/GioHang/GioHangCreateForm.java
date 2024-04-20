package MockProjectBackEnd.Form.MuaHangForms.GioHang;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class GioHangCreateForm {

    @NotNull(message = "Không được để trống mã tài khoản !!")
    private Integer maTaiKhoan;

    @NotNull(message = "Không được để trống mã sản phẩm !!")

    private Integer maSanPham;

    @NotNull(message = "Không được để trống đơn giá !!")
    @PositiveOrZero(message = "Đơn giá không được bé hơn 0 !!")
    private Integer donGia;

    @NotNull(message = "Không được để trống số lượng !!")
    @Positive(message = "Số lượng không được bé hơn hoặc bằng 0 !!")
    private Integer soLuong;

    @NotNull(message = "Không được để trống thành tiền !!")
    @PositiveOrZero(message = "Thành tiền không được bé hơn 0 !!")
    private Integer thanhTien;

}
