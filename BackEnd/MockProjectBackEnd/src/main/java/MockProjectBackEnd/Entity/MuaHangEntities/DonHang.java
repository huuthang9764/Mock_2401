package MockProjectBackEnd.Entity.MuaHangEntities;

import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "DonHang")
@Data
public class DonHang  implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaDonHang")
    private Integer maDonHang;

    @Column(name = "NgayDat", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime ngayDat;

    @Column(name = "TongGiaTri", nullable = false)
    private Integer tongGiaTri;

    @ManyToOne
    @JoinColumn(name = "MaKhachHang", nullable = false)
    private TaiKhoan maKhachHang;

    @ManyToOne
    @JoinColumn(name = "MaDiaChi", nullable = false)
    private DiaChi maDiaChi;

    @ManyToOne
    @JoinColumn(name = "PhuongThucThanhToan", nullable = false)
    private PhuongThucThanhToan phuongThucThanhToan;

    @ManyToOne
    @JoinColumn(name = "DichVuVanChuyen", nullable = false)
    private DichVuVanChuyen dichVuVanChuyen;

    @PrePersist
    public void prePersist(){
        if (ngayDat == null){
            ngayDat = LocalDateTime.now();
        }
    }
}
