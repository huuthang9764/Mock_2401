package MockProjectBackEnd.Controller.SanPhamControllers;

import MockProjectBackEnd.Configuration.ErrorResponse.TheValueAlreadyExists;
import MockProjectBackEnd.DTO.SanPhamDTOs.LoaiSanPhamDTO;
import MockProjectBackEnd.Entity.SanPhamEntities.LoaiSanPham;
import MockProjectBackEnd.Form.SanPhamForms.LoaiSanPham.LoaiSanPhamCreateAndUpdateForm;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import MockProjectBackEnd.Services.SanPhamServices.LoaiSanPham.ILoaiSanPhamService;

import java.util.List;
@RestController
@RequestMapping(value = "/LoaiSanPham")
@CrossOrigin(origins = "*")
public class LoaiSanPhamController {
    @Autowired
    private ILoaiSanPhamService iLoaiSanPhamService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<LoaiSanPhamDTO> getAllLoaiSanPham(Pageable pageable,
                                                  @RequestParam(name = "search", required = false) String search){

        Page<LoaiSanPham> entites = iLoaiSanPhamService.getAllLoaiSanPham(pageable, search);
        List<LoaiSanPhamDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<LoaiSanPhamDTO>>() {}.getType());

        return new PageImpl<>(dtos, pageable, entites.getTotalElements());
    }

    @GetMapping(value = "/{maLoaiSanPham}")
    public LoaiSanPhamDTO  getLoaiSanPhamByID(@PathVariable Integer maLoaiSanPham){
        LoaiSanPham loaiSanPham = iLoaiSanPhamService.getLoaiSanPhamByID(maLoaiSanPham);
        LoaiSanPhamDTO loaiSanPhamDTO = modelMapper.map(loaiSanPham, LoaiSanPhamDTO.class);
        return loaiSanPhamDTO;
    }

    @PostMapping()
    public LoaiSanPhamDTO createLoaiSanPham(@RequestBody @Valid LoaiSanPhamCreateAndUpdateForm form) throws TheValueAlreadyExists {
        LoaiSanPham loaiSanPham =  iLoaiSanPhamService.createLoaiSanPham(form);
        LoaiSanPhamDTO loaiSanPhamDTO = modelMapper.map(loaiSanPham, LoaiSanPhamDTO.class);
        return loaiSanPhamDTO;
    }

    @PatchMapping("/{maLoaiSanPham}")
    public LoaiSanPhamDTO updateLoaiSanPham(@PathVariable Integer maLoaiSanPham,
                                            @RequestBody @Valid LoaiSanPhamCreateAndUpdateForm form) throws TheValueAlreadyExists {
        LoaiSanPham loaiSanPham =  iLoaiSanPhamService.updateLoaiSanPham(maLoaiSanPham, form);
        LoaiSanPhamDTO loaiSanPhamDTO = modelMapper.map(loaiSanPham, LoaiSanPhamDTO.class);
        return loaiSanPhamDTO;
    }

    @DeleteMapping("/{maLoaiSanPham}")
    public void deleteLoaiSanPhamByID(@PathVariable Integer maLoaiSanPham){
        iLoaiSanPhamService.deleteLoaiSanPham(maLoaiSanPham);
    }

    @DeleteMapping("/deleteMany/{danhSachMaLoaiSanPham}")
    public void deleteLoaiSanPhamByListID(@PathVariable List<Integer> danhSachMaLoaiSanPham){
        iLoaiSanPhamService.deleteLoaiSanPhams(danhSachMaLoaiSanPham);
    }
}
