package MockProjectBackEnd.Entity.SanPhamEntities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.List;


@Entity
@Table(name = "LoaiSanPham")
@Data
public class LoaiSanPham implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaLoaiSanPham")
    private Integer maLoaiSanPham;

    @Column(name = "TenLoaiSanPham", nullable = false, unique = true)
    private String tenLoaiSanPham;

    @OneToMany(mappedBy = "loaiSanPham")
    private List<SanPham> danhSachSanPham;
}

