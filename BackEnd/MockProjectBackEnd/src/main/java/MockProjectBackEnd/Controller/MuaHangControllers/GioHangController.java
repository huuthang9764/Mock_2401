package MockProjectBackEnd.Controller.MuaHangControllers;

import MockProjectBackEnd.DTO.MuaHangDTOs.GioHangDTO;
import MockProjectBackEnd.Entity.MuaHangEntities.GioHang;
import MockProjectBackEnd.Form.MuaHangForms.GioHang.GioHangCreateForm;
import MockProjectBackEnd.Form.MuaHangForms.GioHang.GioHangUpdateForm;
import MockProjectBackEnd.Services.MuaHangServices.GioHang.IGioHangService;
import MockProjectBackEnd.Services.SanPhamServices.AnhMinhHoa.IAnhMinhHoaService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping(value = "/GioHang")
@CrossOrigin(origins = "*")
public class GioHangController {
    @Autowired
    private IGioHangService gioHangService;

    @Autowired
    private IAnhMinhHoaService anhMinhHoaService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping(value = "/{maTaiKhoan}")
    public List<GioHangDTO> getAllGioHangById(@PathVariable Integer maTaiKhoan){

        List<GioHang> entities = gioHangService.getAllGioHangByMaTaiKhoan(maTaiKhoan);
        List<GioHangDTO> dtos = modelMapper.map(entities, new TypeToken<List<GioHangDTO>>() {}.getType());

        for (int i=0; i< entities.size(); i++) {
            dtos.get(i).setAnhMinhHoa(
                anhMinhHoaService.getAnhMinhHoaByMaSanPham(
                    entities.get(i).getId().getMaSanPham()
                ).get(0).getId().getUrl()
            );
        }

        return dtos;

    }

    @PostMapping()
    public GioHangDTO createGioHang(@RequestBody @Valid GioHangCreateForm form) {
        GioHang gioHang = gioHangService.createGioHang(form);
        GioHangDTO gioHangDTO = modelMapper.map(form, GioHangDTO.class);

        gioHangDTO.setSanPhamTenSanPham(gioHang.getSanPham().getTenSanPham());
        gioHangDTO.setAnhMinhHoa(
            anhMinhHoaService.getAnhMinhHoaByMaSanPham( form.getMaSanPham() )
                .get(0).getId().getUrl()
        );
        return gioHangDTO;
    }

    @PatchMapping()
    public GioHangDTO updateGioHang(@RequestBody @Valid GioHangUpdateForm form) {
        GioHang gioHang = gioHangService.updateGioHang(form);
        GioHangDTO gioHangDTO = modelMapper.map(form, GioHangDTO.class);

        gioHangDTO.setSanPhamTenSanPham(gioHang.getSanPham().getTenSanPham());
        gioHangDTO.setAnhMinhHoa(
            anhMinhHoaService.getAnhMinhHoaByMaSanPham( form.getMaSanPham() )
                .get(0).getId().getUrl()
        );
        return gioHangDTO;
    }

    @DeleteMapping(value = "/{maTaiKhoan}/{maSanPham}")
    public void deleteGioHang(@PathVariable Integer maTaiKhoan,
                              @PathVariable Integer maSanPham) {
        gioHangService.deleteGioHang(maTaiKhoan, maSanPham);

    }
}

