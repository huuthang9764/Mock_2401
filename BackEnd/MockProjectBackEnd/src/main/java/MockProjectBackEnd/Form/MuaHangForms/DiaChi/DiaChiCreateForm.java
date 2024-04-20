package MockProjectBackEnd.Form.MuaHangForms.DiaChi;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DiaChiCreateForm {

    @NotNull(message = "Bạn không được để trống mã người dùng sở hữu !!")
    private Integer maNguoiDung;

    @NotBlank(message = "Bạn không được để trống quốc gia !!")
    private String quocGia;

    @NotBlank(message = "Bạn không được để trống  tỉnh !!")
    private String tinh;

    @NotBlank(message = "Bạn không được để trống quận / huyện !!")
    private String quan;

    @NotBlank(message = "Bạn không được để trống phường / xã !!")
    private String phuong;

    @NotBlank(message = "Bạn không được để trống số nhà  !!")
    private String soNha;

    private Boolean trangThaiTonTai;

}
