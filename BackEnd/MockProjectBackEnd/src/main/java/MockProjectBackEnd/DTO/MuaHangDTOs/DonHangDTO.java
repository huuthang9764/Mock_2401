package MockProjectBackEnd.DTO.MuaHangDTOs;

import MockProjectBackEnd.Entity.MuaHangEntities.DiaChi;
import MockProjectBackEnd.Entity.MuaHangEntities.DichVuVanChuyen;
import MockProjectBackEnd.Entity.MuaHangEntities.PhuongThucThanhToan;
import MockProjectBackEnd.Entity.MuaHangEntities.TrangThai;
import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class DonHangDTO {

    private Integer maDonHang;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime ngayDat;

    private Integer tongGiaTri;

    @JsonProperty("email")
    private String maKhachHangNguoiDungEmail;

    private DiaChiDTO diaChi;

    private String tenDichVuVanChuyen;

    private String tenPhuongThucThanhToan;

    private TrangThai trangThaiMoiNhat;

}
