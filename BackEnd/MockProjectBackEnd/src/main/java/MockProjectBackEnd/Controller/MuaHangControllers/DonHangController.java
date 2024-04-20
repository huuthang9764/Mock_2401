package MockProjectBackEnd.Controller.MuaHangControllers;

import MockProjectBackEnd.DTO.MuaHangDTOs.ChiTietDonHangDTO;
import MockProjectBackEnd.DTO.MuaHangDTOs.DonHangDTO;
import MockProjectBackEnd.DTO.MuaHangDTOs.TrangThaiDonHangDTO;
import MockProjectBackEnd.Entity.MuaHangEntities.CTDH;
import MockProjectBackEnd.Entity.MuaHangEntities.DonHang;
import MockProjectBackEnd.Entity.MuaHangEntities.TrangThaiDonHang;
import MockProjectBackEnd.Form.MuaHangForms.DonHang.DonHangCreateForm;
import MockProjectBackEnd.Form.MuaHangForms.DonHang.DonHangFillerForm;
import MockProjectBackEnd.Form.MuaHangForms.DonHang.DonHangUpdateForm;
import MockProjectBackEnd.Services.MuaHangServices.ChiTietDonHang.ICTDHService;
import MockProjectBackEnd.Services.MuaHangServices.DonHang.IDonHangService;
import MockProjectBackEnd.Services.MuaHangServices.TrangThaiDonHang.ITrangThaiDonHangService;
import MockProjectBackEnd.Services.SanPhamServices.AnhMinhHoa.IAnhMinhHoaService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/DonHang")
@CrossOrigin(origins = "*")
public class DonHangController {
    @Autowired
    private IDonHangService donHangService;

    @Autowired
    private ITrangThaiDonHangService trangThaiDonHangService;

    @Autowired
    private ICTDHService chiTietDonHangService;

    @Autowired
    private IAnhMinhHoaService anhMinhHoaService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<DonHangDTO> getAllDonHang(DonHangFillerForm form, Pageable pageable) {
        Page<DonHang> entities = donHangService.getAllDonHang(form, pageable);
        List<DonHangDTO> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<DonHangDTO>>() {}.getType());

        for (DonHangDTO dto: dtos) {
            dto.setTrangThaiMoiNhat(
                trangThaiDonHangService.trangThaiDonHangMoiNhat(dto.getMaDonHang()).getId().getTrangThai()
            );
        }


        return new PageImpl<>(dtos, pageable, entities.getTotalElements());
    }

    @GetMapping("/donHangCuaToi/{maKhachHang}")
    public List<DonHangDTO> getAllDonHangCuaToi(@PathVariable Integer maKhachHang) {
        List<DonHang> entities = donHangService.getAllDonHangByMaKhachHang(maKhachHang);
        List<DonHangDTO> dtos = modelMapper.map(entities, new TypeToken<List<DonHangDTO>>() {}.getType());

        for (DonHangDTO dto: dtos) {
            dto.setTrangThaiMoiNhat(
                trangThaiDonHangService.trangThaiDonHangMoiNhat(dto.getMaDonHang()).getId().getTrangThai()
            );
        }

        return dtos;
    }

    @GetMapping("/{maDonHang}")
    public DonHangDTO getAllDonHangByMaDonHang(@PathVariable Integer maDonHang) {
        DonHang entities = donHangService.getAllDonHangByMaDonHang(maDonHang);
        DonHangDTO dto = modelMapper.map(entities, DonHangDTO.class);

            dto.setTrangThaiMoiNhat(
                trangThaiDonHangService.trangThaiDonHangMoiNhat(dto.getMaDonHang()).getId().getTrangThai()
            );

        return dto;
    }

    @GetMapping(value = "/chiTietDonHang/{maDonHang}")
    public List<ChiTietDonHangDTO> getAllChiTietDonHangByMaDonHang(@PathVariable Integer maDonHang) {
        List<CTDH> entities = chiTietDonHangService.getAllCTDHByMaDonHang(maDonHang);
        List<ChiTietDonHangDTO> dtos = modelMapper.map(entities, new TypeToken<List<ChiTietDonHangDTO>>() {}.getType());

        for (ChiTietDonHangDTO dto: dtos) {
            dto.setAnhMinhHoa(
                anhMinhHoaService.getAnhMinhHoaByMaSanPham(dto.getMaSanPham())
                    .get(0).getId().getUrl()
            );
        }

        return dtos;
    }

    @GetMapping(value = "/trangThaiDonHang/{maDonHang}")
    public List<TrangThaiDonHangDTO> getAllTrangThaiDonHangByMaDonHang(@PathVariable Integer maDonHang) {

        List<TrangThaiDonHang> entities = trangThaiDonHangService.getAllTrangThaiDonHang(maDonHang);
        List<TrangThaiDonHangDTO> dtos = modelMapper.map(entities, new TypeToken<List<TrangThaiDonHangDTO>>() {}.getType());

        return dtos;
    }


    @PostMapping()
    public DonHangDTO createDonHang(@RequestBody @Valid DonHangCreateForm form){
        DonHang donHang = donHangService.createDonHang(form);
        DonHangDTO dto =  modelMapper.map(donHang, DonHangDTO.class);
        dto.setTrangThaiMoiNhat(
            trangThaiDonHangService.trangThaiDonHangMoiNhat(donHang.getMaDonHang()).getId().getTrangThai()
        );
        return dto;

    }

    @PatchMapping(value = "/{maDonHang}")
    public DonHangDTO updateDonHang(@PathVariable Integer maDonHang
                                    ,@RequestBody @Valid DonHangUpdateForm form){
        DonHang donHang = donHangService.updateDonHang(maDonHang, form);
        DonHangDTO dto =  modelMapper.map(donHang, DonHangDTO.class);
        dto.setTrangThaiMoiNhat(
            trangThaiDonHangService.trangThaiDonHangMoiNhat(donHang.getMaDonHang()).getId().getTrangThai()
        );
        return dto;
    }
}
