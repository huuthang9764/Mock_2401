package MockProjectBackEnd.Controller.SuKienControllers;

import MockProjectBackEnd.DTO.SuKienDTOs.SuKienDTO;
import MockProjectBackEnd.Entity.SuKienEntities.SuKien;
import MockProjectBackEnd.Form.SuKienForms.SuKien.SuKienCreateForm;
import MockProjectBackEnd.Form.SuKienForms.SuKien.SuKienUpdateForm;
import MockProjectBackEnd.Services.SuKienServices.SuKien.ISuKienService;
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
@RequestMapping(value = "/SuKien")
@CrossOrigin(origins = "*")

public class SuKienController {

    @Autowired
    private ISuKienService suKienService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<SuKienDTO> getAllLoaiSanPham(Pageable pageable){

        Page<SuKien> entites = suKienService.getAllSuKien(pageable);
        List<SuKienDTO> dtos = modelMapper.map(entites.getContent(), new TypeToken<List<SuKienDTO>>() {}.getType());

        return new PageImpl<>(dtos, pageable, entites.getTotalElements());
    }

    @GetMapping(value = "/{maSuKien}")
    public SuKienDTO  getSuKienByID(@PathVariable Integer maSuKien){
        SuKien suKien = suKienService.getSuKienByID(maSuKien);
        return modelMapper.map(suKien, SuKienDTO.class );
    }

    @PostMapping()
    public void createSuKien(@RequestBody @Valid SuKienCreateForm form){
        suKienService.createSuKien(form);
    }

    @PutMapping("/{maSuKien}")
    public void updateSuKien(@PathVariable Integer maSuKien,
                                         @RequestBody @Valid SuKienUpdateForm form){
        suKienService.updateSuKien(maSuKien, form);
    }

    @DeleteMapping("/{maSuKien}")
    public void deleteSuKienByID(@PathVariable Integer maSuKien){
        suKienService.deleteSuKien(maSuKien);
    }

    @DeleteMapping("/more/{danhSachMaSuKien}")
    public void deleteSuKienByListID(@PathVariable List<Integer> danhSachMaSuKien){
        suKienService.deleteNhieuSuKien(danhSachMaSuKien);
    }
}
