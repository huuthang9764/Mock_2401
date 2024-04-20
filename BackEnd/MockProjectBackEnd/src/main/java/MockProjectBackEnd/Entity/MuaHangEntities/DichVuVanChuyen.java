package MockProjectBackEnd.Entity.MuaHangEntities;

import lombok.Data;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "DichVuVanChuyen")
@Data
public class DichVuVanChuyen  implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaDichVu")
    private Integer maDichVu;

    @Column(name = "TenDichVu", nullable = false, unique = true)
    private String tenDichVu;

}
