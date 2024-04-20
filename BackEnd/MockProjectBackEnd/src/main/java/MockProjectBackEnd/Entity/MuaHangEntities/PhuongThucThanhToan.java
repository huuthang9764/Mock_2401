package MockProjectBackEnd.Entity.MuaHangEntities;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Entity
@Table(name = "PhuongThucThanhToan")
@Data
public class PhuongThucThanhToan implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaPhuongThuc")
    private Integer maPhuongThuc;

    @Column(name = "TenPhuongThuc", nullable = false, unique = true)
    private String tenPhuongThuc;

}
