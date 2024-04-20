package MockProjectBackEnd.Entity.MuaHangEntities;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "TrangThaiDonHang")
public class TrangThaiDonHang implements Serializable{

    @EmbeddedId
    private TrangThaiDonHangPK id;

    @Column(name = "NgayCapNhat", nullable = false)
    private LocalDateTime ngayCapNhat;

    @ManyToOne()
    @MapsId("MaDonHang") //Chỉ ra rằng đây là khóa ngoại của khóa chnh
    @JoinColumn(name = "MaDonHang", referencedColumnName = "MaDonHang")
    private DonHang donHang;

    @Embeddable
    @Data
    @NoArgsConstructor
    public static class TrangThaiDonHangPK implements Serializable {

        @Column(name = "MaDonHang")
        private Integer maDonHang;

        @Enumerated(EnumType.STRING)
        @Column(name = "TrangThai", nullable = false)
        private TrangThai trangThai;

    }
}
