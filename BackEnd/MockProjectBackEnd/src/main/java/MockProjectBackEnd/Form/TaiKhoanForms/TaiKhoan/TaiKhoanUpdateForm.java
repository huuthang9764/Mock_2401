package MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan;

import MockProjectBackEnd.Entity.TaiKhoanEntities.GioiTinh;
import MockProjectBackEnd.Entity.TaiKhoanEntities.Quyen;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaiKhoanUpdateForm {

    private boolean trangThai;

    private Quyen quyen;

    private String hoTen;

    @PastOrPresent(message = "Ngày sinh phải là 1 ngày trong quá khứ hoặc hôm nay !!")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate ngaySinh;

    private GioiTinh gioiTinh;

    private String soDienThoai;

    public Boolean isTrangThai() {
        return trangThai;
    }
}
