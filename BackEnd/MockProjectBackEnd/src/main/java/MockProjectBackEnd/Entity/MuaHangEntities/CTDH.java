package MockProjectBackEnd.Entity.MuaHangEntities;
import MockProjectBackEnd.Entity.SanPhamEntities.SanPham;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "CTDH")
@Data
public class CTDH implements Serializable {

    @EmbeddedId
    private CTDHPK id;

    @Column(name = "DonGia", nullable = false)
    private Integer donGia;

    @Column(name = "SoLuong", nullable = false)
    private Integer soLuong;

    @Column(name = "ThanhTien", nullable = false)
    private Integer thanhTien;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("MaDonHang") //Chỉ ra rằng đây là khóa ngoại của khóa chnh
    @JoinColumn(name = "MaDonHang", referencedColumnName = "MaDonHang", insertable = false, updatable = false)
    private DonHang donHang;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("MaSanPham") //Chỉ ra rằng đây là khóa ngoại của khóa chnh
    @JoinColumn(name = "MaSanPham", referencedColumnName = "MaSanPham", insertable = false, updatable = false)
    private SanPham sanPham;


    @Embeddable
    @Data
    @NoArgsConstructor
    public static class CTDHPK implements Serializable {

        @Column(name = "MaDonHang")
        private Integer maDonHang;

        @Column(name = "MaSanPham")
        private Integer maSanPham;

    }

}