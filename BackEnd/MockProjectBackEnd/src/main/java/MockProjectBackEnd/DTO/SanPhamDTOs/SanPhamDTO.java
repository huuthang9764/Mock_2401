package MockProjectBackEnd.DTO.SanPhamDTOs;

import lombok.Data;

import java.util.List;

@Data
public class SanPhamDTO {

    private Integer maSanPham;

    private String tenSanPham;

    private String soLuot;

    private String moTaChiTiet;

    private Integer gia;

    private Integer soLuongSanPham;

    private Boolean trangThai;

    private String xuatXu;

    private Integer maThuongHieu;

    private Integer maLoaiSanPham;

    private List<AnhMinhHoaDTO> danhSachAnhMinhHoa;

    public SanPhamDTO(){}
}
