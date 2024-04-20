package MockProjectBackEnd.DTO.SanPhamDTOs;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AnhMinhHoaDTO {

    @JsonProperty("url")
    private String idUrl;
    public AnhMinhHoaDTO(){}
}
