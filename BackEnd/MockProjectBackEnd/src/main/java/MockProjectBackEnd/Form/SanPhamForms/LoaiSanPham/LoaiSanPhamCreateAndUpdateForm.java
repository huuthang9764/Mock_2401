package MockProjectBackEnd.Form.SanPhamForms.LoaiSanPham;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
public class LoaiSanPhamCreateAndUpdateForm {

    @NotBlank(message = "Bạn không được để trống tên loại sản phẩm !!")
    private String tenLoaiSanPham;

}
