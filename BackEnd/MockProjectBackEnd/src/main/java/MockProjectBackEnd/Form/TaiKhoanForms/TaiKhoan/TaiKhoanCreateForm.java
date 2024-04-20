package MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan;

import MockProjectBackEnd.Entity.TaiKhoanEntities.GioiTinh;
import MockProjectBackEnd.Entity.TaiKhoanEntities.Quyen;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaiKhoanCreateForm {

    private boolean trangThai;

    @NotNull(message = "Bạn không được để trống quyền !!")
    private Quyen quyen;

    @NotBlank(message = "Bạn không được để trống họ tên !!")
    private String hoTen;

    @NotNull(message = "Bạn không được để trống ngày sinh !!")
    @PastOrPresent(message = "Ngày sinh phải là 1 ngày trong quá khứ hoặc hôm nay !!")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate ngaySinh;

    @NotNull(message = "Bạn không được để trống giới tính !!")
    private GioiTinh gioiTinh;

    @NotBlank(message = "Bạn không được để trống số điện thoại !!")
    private String soDienThoai;

    @NotBlank(message = "Bạn không được để trống email !!")
    @Email(message = "Email phải đúng định dạng email !!")
    private String email;

    @NotBlank(message = "Bạn không được để trống mật khẩu !!")
    private String matKhau;

}
