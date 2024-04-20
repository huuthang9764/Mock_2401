package MockProjectBackEnd.DTO.ThongKeDTOs;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ThongKeTongQuatDTO {

    private Integer soDonHangThangNay;

    private Integer soDonHangThangTruoc;

    private Integer soDonHangGiaoThanhCongThangNay;

    private Integer soDonHangGiaoThanhCongThangTruoc;

    private Integer doanhThuHomNay;

    private Integer doanhThuHomQua;

    private Integer doanhThuThangNay;

    private Integer doanhThuThangTruoc;

}
