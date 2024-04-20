package MockProjectBackEnd.DTO.SuKienDTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
public class SuKienDTO {

    private Integer maSuKien;

    private String tenSuKien;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate ngayBatDau;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate ngayKetThuc;

}
