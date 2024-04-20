package MockProjectBackEnd.Form.SanPhamForms.SanPham;

import MockProjectBackEnd.Form.SanPhamForms.AnhMinhHoa.AnhMinhHoaCreateUpdateDeleteForm;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.util.List;

@Data
public class SanPhamCreateForm {

    @NotBlank(message = "Bạn không thể để trống tên sản phẩm !!")
    private String tenSanPham;

    @NotBlank(message = "Bạn không thể để trống xuất xứ !!")
    private String xuatXu;

    @PositiveOrZero(message = "Giá bán phải lớn hơn hoặc bằng 0 !!")
    private Integer gia;

    @NotBlank(message = "Bạn không thể để trống xuất xứ !!")
    private String soLuot;

    @NotBlank(message = "Bạn không thể để trống xuất xứ !!")
    private String moTaChiTiet;

    @NotNull(message = "Bạn không thể để mã loại sản phẩm !!")
    private Integer maLoaiSanPham;

    @NotNull(message = "Bạn không thể để mã thương hiệu !!")
    private Integer maThuongHieu;

    @NotNull(message = "Nếu không có ảnh hãy truyền 1 chuỗi empty !!")
    private List<AnhMinhHoaCreateUpdateDeleteForm> danhSachAnhMinhHoa;


}
