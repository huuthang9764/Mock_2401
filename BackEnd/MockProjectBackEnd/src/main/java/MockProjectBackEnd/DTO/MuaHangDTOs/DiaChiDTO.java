package MockProjectBackEnd.DTO.MuaHangDTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DiaChiDTO {

    private Integer maDiaChi;

    private String quocGia;

    private String tinh;

    private String quan;

    private String phuong;

    private String soNha;

    private Boolean trangThaiMacDinh;

}
