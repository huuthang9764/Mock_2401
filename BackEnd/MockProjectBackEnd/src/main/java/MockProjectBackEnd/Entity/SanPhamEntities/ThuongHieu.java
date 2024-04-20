package MockProjectBackEnd.Entity.SanPhamEntities;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name = "ThuongHieu")
@Data
public class ThuongHieu implements Serializable {

    @Id
    @Column(name = "MaThuongHieu")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maThuongHieu;

    @Column(name = "TenThuongHieu", nullable = false, unique = true)
    private String tenThuongHieu;

}
