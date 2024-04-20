package MockProjectBackEnd.DTO.MuaHangDTOs;

import MockProjectBackEnd.Entity.MuaHangEntities.TrangThai;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class TrangThaiDonHangDTO {

    @JsonProperty("trangThai")
    private TrangThai idTrangThai;

    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime ngayCapNhat;
}
