package MockProjectBackEnd.Entity.SanPhamEntities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "SanPham")
@Data
public class SanPham implements Serializable {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "MaSanPham")
        private Integer maSanPham;

        @Column(name = "TenSanPham", nullable = false, unique = true)
        private String tenSanPham;

        @Column(name = "XuatXu", nullable = false)
        private String xuatXu;

        @Column(name = "Gia", nullable = false)
        private Integer gia;

        @Column(name = "SoLuongConLai", nullable = false)
        private Integer soLuongConLai;

        @Column(name = "TrangThai", nullable = false)
        private Boolean trangThai;

        @Column(name = "SoLuot", nullable = false)
        private String soLuot;

        @Column(name = "MoTaChiTiet", nullable = false)
        private String moTaChiTiet;

        @ManyToOne
        @JoinColumn(name = "MaLoaiSanPham", nullable = false)
        private LoaiSanPham loaiSanPham;

        @ManyToOne
        @JoinColumn(name = "MaThuongHieu", nullable = false)
        private ThuongHieu thuongHieu;

        @OneToMany(mappedBy = "sanPham")
        private List<AnhMinhHoa> danhSachAnhMinhHoa;

        @PrePersist
        public void prePersist(){
                if (trangThai == null){
                        trangThai = true;
                }

                if (soLuongConLai == null){
                        soLuongConLai = 0;
                }
        }

}
