package MockProjectBackEnd.Entity.TaiKhoanEntities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "NguoiDung")
@Data
public class NguoiDung implements Serializable {

    @Id
    @Column(name = "MaNguoiDung")
    private Integer maNguoiDung;

    @Column(name = "HoTen", nullable = false)
    private String hoTen;

    @Column(name = "NgaySinh", nullable = false)
    private LocalDate ngaySinh;

    @Column(name = "GioiTinh", nullable = false)
    @Enumerated(EnumType.STRING)
    private GioiTinh gioiTinh;

    @Column(name = "SoDienThoai", nullable = false)
    private String soDienThoai;

    @Column(name = "Email", nullable = false, unique = true)
    private String email;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaNguoiDung", referencedColumnName = "MaTaiKhoan")
    private TaiKhoan taiKhoan;

}