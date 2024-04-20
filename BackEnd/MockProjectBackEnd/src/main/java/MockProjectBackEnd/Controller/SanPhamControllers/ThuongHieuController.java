package MockProjectBackEnd.Controller.SanPhamControllers;
import MockProjectBackEnd.Configuration.ErrorResponse.TheValueAlreadyExists;
import MockProjectBackEnd.DTO.SanPhamDTOs.ThuongHieuDTO;
import MockProjectBackEnd.DTO.SanPhamDTOs.ThuongHieuDTO;
import MockProjectBackEnd.Entity.SanPhamEntities.ThuongHieu;
import MockProjectBackEnd.Entity.SanPhamEntities.ThuongHieu;
import MockProjectBackEnd.Form.SanPhamForms.ThuongHieu.ThuongHieuCreateAndUpdateForm;
import MockProjectBackEnd.Services.SanPhamServices.ThuongHieu.IThuongHieuService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import MockProjectBackEnd.Services.SanPhamServices.ThuongHieu.IThuongHieuService;

import java.util.List;
@RestController
@RequestMapping(value = "/ThuongHieu")
@CrossOrigin(origins = "*")
public class ThuongHieuController {
    @Autowired
    private IThuongHieuService service;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<ThuongHieuDTO> getAllThuongHieu(Pageable pageable,
                                                 @RequestParam(name = "search", required = false) String search){

        Page<ThuongHieu> entites = service.getAllThuongHieu(pageable, search);
        List<ThuongHieuDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<ThuongHieuDTO>>() {}.getType());

        return new PageImpl<>(dtos, pageable, entites.getTotalElements());
    }

    @GetMapping(value = "/{maThuongHieu}")
    public ThuongHieuDTO  getThuongHieuByID(@PathVariable Integer maThuongHieu){
        ThuongHieu thuongHieu = service.getThuongHieuByID(maThuongHieu);
        ThuongHieuDTO thuongHieuDTO = modelMapper.map(thuongHieu, ThuongHieuDTO.class);
        return thuongHieuDTO;
    }

    @PostMapping()
    public ThuongHieuDTO createThuongHieu(@RequestBody @Valid ThuongHieuCreateAndUpdateForm form) throws TheValueAlreadyExists {
        ThuongHieu thuongHieu =  service.createThuongHieu(form);
        ThuongHieuDTO thuongHieuDTO = modelMapper.map(thuongHieu, ThuongHieuDTO.class);
        return thuongHieuDTO;
    }

    @PatchMapping("/{maThuongHieu}")
    public ThuongHieuDTO updateThuongHieu(@PathVariable Integer maThuongHieu,
                                            @RequestBody @Valid ThuongHieuCreateAndUpdateForm form) throws TheValueAlreadyExists {
        ThuongHieu thuongHieu =  service.updateThuongHieu(maThuongHieu, form);
        ThuongHieuDTO thuongHieuDTO = modelMapper.map(thuongHieu, ThuongHieuDTO.class);
        return thuongHieuDTO;
    }

    @DeleteMapping("/{maThuongHieu}")
    public void deleteThuongHieuByID(@PathVariable Integer maThuongHieu){
        service.deleteThuongHieu(maThuongHieu);
    }

    @DeleteMapping("/deleteMany/{danhSachMaThuongHieu}")
    public void deleteThuongHieuByListID(@PathVariable List<Integer> danhSachMaThuongHieu){
        service.deleteThuongHieus(danhSachMaThuongHieu);
    }
}
