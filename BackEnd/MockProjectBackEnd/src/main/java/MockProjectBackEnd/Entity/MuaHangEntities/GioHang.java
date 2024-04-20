package MockProjectBackEnd.Entity.MuaHangEntities;

import MockProjectBackEnd.Entity.SanPhamEntities.AnhMinhHoa;
import MockProjectBackEnd.Entity.SanPhamEntities.SanPham;
import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "GioHang")
@Data
public class GioHang implements Serializable {

    @EmbeddedId
    private GioHang.GioHangPK id;

    @Column(name = "DonGia", nullable = false)
    private Integer donGia;

    @Column(name = "SoLuong", nullable = false)
    private Integer soLuong;

    @Column(name = "ThanhTien", nullable = false)
    private Integer thanhTien;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("MaTaiKhoan") //Chỉ ra rằng đây là khóa ngoại của khóa chnh
    @JoinColumn(name = "MaTaiKhoan", referencedColumnName = "MaTaiKhoan", insertable = false, updatable = false)
    private TaiKhoan taiKhoan;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("MaSanPham") //Chỉ ra rằng đây là khóa ngoại của khóa chnh
    @JoinColumn(name = "MaSanPham", referencedColumnName = "MaSanPham", insertable = false, updatable = false)
    private SanPham sanPham;


    @Embeddable
    @Data
    @NoArgsConstructor
    public static class GioHangPK implements Serializable {

        @Column(name = "MaTaiKhoan")
        private Integer maTaiKhoan;

        @Column(name = "MaSanPham")
        private Integer maSanPham;

    }
}