package MockProjectBackEnd.Form.MuaHangForms.DonHang;

import MockProjectBackEnd.Entity.MuaHangEntities.DichVuVanChuyen;
import MockProjectBackEnd.Entity.MuaHangEntities.PhuongThucThanhToan;
import MockProjectBackEnd.Form.MuaHangForms.ChiTietDonHang.CTDHCreateForm;
import MockProjectBackEnd.Form.MuaHangForms.DiaChi.DiaChiCreateForm;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.util.List;

@Data
public class DonHangCreateForm {

    @NotNull(message = "Bạn không được để trống tổng giá trị !!")
    @PositiveOrZero(message = "Tổng giá trị phải là số lớn hơn 0")
    private Integer tongGiaTri;

    @NotNull(message = "Bạn không được để trống phương thức thanh toán !!")
    private Integer maPhuongThucThanhToan;

    @NotNull(message = "Bạn không được để trống phương thức vận chuyển !!")
    private Integer maDichVuVanChuyen;

    //Nếu người dùng sử dụng địa chỉ có sẵn thì truyền ID
    private Integer maDiaChi;

    //Nếu ng dùng sử dụng địa chỉ mới thì bỏ ID và truyền hẳn 1 form tạo mới
    private DiaChiCreateForm diaChiGiaoHang;

    @NotNull(message = "Bạn không được để trống mã khách hàng !!")
    private Integer maKhachHang;

    @NotNull(message = "Không thể tạo 1 đơn hàng rỗng !!")
    private List<CTDHCreateForm> danhSachSanPham;

}
