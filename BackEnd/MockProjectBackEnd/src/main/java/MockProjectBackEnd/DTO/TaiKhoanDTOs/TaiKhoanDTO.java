package MockProjectBackEnd.DTO.TaiKhoanDTOs;

import MockProjectBackEnd.Entity.TaiKhoanEntities.GioiTinh;
import MockProjectBackEnd.Entity.TaiKhoanEntities.Quyen;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class TaiKhoanDTO {


    private Integer maTaiKhoan;

    private Boolean trangThai;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime ngayTao;

    private Quyen quyen;

    @JsonProperty("hoTen")
    private String nguoiDungHoTen;

    @JsonProperty("ngaySinh")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate nguoiDungNgaySinh;

    @JsonProperty("gioiTinh")
    private GioiTinh nguoiDungGioiTinh;

    @JsonProperty("soDienThoai")
    private String nguoiDungSoDienThoai;

    @JsonProperty("email")
    private String nguoiDungEmail;


}
