package MockProjectBackEnd.Entity.MuaHangEntities;

import MockProjectBackEnd.Entity.TaiKhoanEntities.NguoiDung;
import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "DiaChi")
@Data
public class DiaChi implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaDiaChi")
    private Integer maDiaChi;

    @Column(name = "MaNguoiDung", nullable = false)
    private Integer maNguoiDung;

    @MapsId("MaNguoiDung") //Chỉ ra rằng đây là khóa ngoại của khóa chnh
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MaNguoiDung", referencedColumnName = "MaNguoiDung", nullable = false)
    private NguoiDung nguoiDung;

    @Column(name = "QuocGia", nullable = false)
    private String quocGia;

    @Column(name = "Tinh", nullable = false)
    private String tinh;

    @Column(name = "Quan", nullable = false)
    private String quan;

    @Column(name = "Phuong", nullable = false)
    private String phuong;

    @Column(name = "SoNha", nullable = false)
    private String soNha;

    @Column(name = "TrangThaiMacDinh", nullable = false)
    private Boolean trangThaiMacDinh;

    @Column(name = "TrangThaiTonTai", nullable = false)
    private Boolean trangThaiTonTai;

    @PrePersist
    public void prePersist(){
        if (trangThaiTonTai == null){
            trangThaiTonTai = true;
        }

        if (trangThaiMacDinh == null){
            trangThaiMacDinh = false;
        }

    }
}
