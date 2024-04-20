package MockProjectBackEnd.DTO.TaiKhoanDTOs;

import MockProjectBackEnd.Entity.TaiKhoanEntities.Quyen;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginInfoDTO {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String expirationTime;
    private String email;
    private String role;
    private String hoTen;
    private Integer maTaiKhoan;
    private Boolean trangThai;

}
