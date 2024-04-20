package MockProjectBackEnd.Controller.MuaHangControllers;

import MockProjectBackEnd.DTO.MuaHangDTOs.DiaChiDTO;
import MockProjectBackEnd.DTO.MuaHangDTOs.GioHangDTO;
import MockProjectBackEnd.Entity.MuaHangEntities.DiaChi;
import MockProjectBackEnd.Entity.MuaHangEntities.GioHang;
import MockProjectBackEnd.Form.MuaHangForms.DiaChi.DiaChiCreateForm;
import MockProjectBackEnd.Form.MuaHangForms.DiaChi.DiaChiUpdateForm;
import MockProjectBackEnd.Services.MuaHangServices.DiaChi.IDiaChiService;
import MockProjectBackEnd.Services.MuaHangServices.GioHang.IGioHangService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/DiaChi")
@CrossOrigin(origins = "*")
public class DiaChiController {

    @Autowired
    private IDiaChiService diaChiService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping(value = "/diaChiCuaToi/{maNguoiDung}")
    public List<DiaChiDTO> getAllDiaChiByMaNguoiDung(@PathVariable Integer maNguoiDung){

        List<DiaChi> entities = diaChiService.getAllDiaChiByMaNguoiDung(maNguoiDung);
        List<DiaChiDTO> dtos = modelMapper.map(entities, new TypeToken<List<DiaChiDTO>>() {}.getType());

        return dtos;
    }

    @GetMapping(value = "/{maDiaChi}")
    public DiaChiDTO getAllDiaChiById(@PathVariable Integer maDiaChi){

        DiaChi entities = diaChiService.getDiaChiByMaDiaChi(maDiaChi);
        DiaChiDTO dtos = modelMapper.map(entities,DiaChiDTO.class);

        return dtos;
    }

    @PostMapping()
    public DiaChiDTO createDiaChi(@RequestBody @Valid DiaChiCreateForm form){

        DiaChi entities = diaChiService.createDiaChi(form);

        return modelMapper.map(form, DiaChiDTO.class);
    }

    @PatchMapping(value = "/{maDiaChi}")
    public DiaChiDTO updateDiaChi(@PathVariable Integer maDiaChi,
                                  @RequestBody @Valid DiaChiUpdateForm form){

        DiaChi entities = diaChiService.updateDiaChi(maDiaChi, form);

        DiaChiDTO diaChiDTO = modelMapper.map(entities, DiaChiDTO.class);

        return diaChiDTO;
    }

    @DeleteMapping(value = "/{maDiaChi}")
    public void deleteDiaChi(@PathVariable Integer maDiaChi){

        diaChiService.deleteDiaChi(maDiaChi);
    }


}
