package MockProjectBackEnd.Entity.TaiKhoanEntities;

import jakarta.persistence.*;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "RegistrationToken")
@Data
public class RegistrationToken implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "token", unique = true, nullable = false)
    private String token;

    @Column(name = "MaTaiKhoan", nullable = false)
    private Integer maTaiKhoan;

    @Column(name = "HanSuDung", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime hanSuDung;

    @ManyToOne
    @JoinColumn(name = "MaTaiKhoan", insertable = false, updatable = false)
    private TaiKhoan taiKhoan;

    @PrePersist
    void prePersists(){
        if (hanSuDung == null){
            //Set hạn sử dụng trong 2 giờ
            hanSuDung = LocalDateTime.now().plusHours(2);
        }
    }
}
