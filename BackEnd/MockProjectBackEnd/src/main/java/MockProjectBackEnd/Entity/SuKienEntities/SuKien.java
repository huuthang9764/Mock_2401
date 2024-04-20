package MockProjectBackEnd.Entity.SuKienEntities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "SuKien")
@Data
public class SuKien implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MaSuKien")
    private Integer maSuKien;

    @Column(name = "TenSuKien", nullable = false)
    private String tenSuKien;

    @Column(name = "NgayBatDau", nullable = false)
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate ngayBatDau;

    @Column(name = "NgayKetThuc", nullable = false)
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate ngayKetThuc;

}

