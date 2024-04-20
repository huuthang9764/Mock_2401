package MockProjectBackEnd.Form.SanPhamForms.ThuongHieu;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ThuongHieuCreateAndUpdateForm {
    @NotBlank(message = "Bạn không được để trống tên thương hiệu !!")
    private String tenThuongHieu;
}
