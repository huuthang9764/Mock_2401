package MockProjectBackEnd.Form.SanPhamForms.SanPham;

import MockProjectBackEnd.Form.SanPhamForms.AnhMinhHoa.AnhMinhHoaCreateUpdateDeleteForm;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.util.List;

@Data
public class SanPhamUpdateForm {

    private String tenSanPham;

    private String xuatXu;

    @PositiveOrZero(message = "Giá bán phải lớn hơn hoặc bằng 0 !!")
    private Integer gia;

    private String soLuot;

    private String moTaChiTiet;

    private Boolean trangThai;

    private Integer maLoaiSanPham;

    private Integer maThuongHieu;

    private List<AnhMinhHoaCreateUpdateDeleteForm> danhSachAnhCanThemMoi;

    private List<AnhMinhHoaCreateUpdateDeleteForm> danhSachAnhCanXoa;


}
