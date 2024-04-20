package MockProjectBackEnd.Controller.SanPhamControllers;

import MockProjectBackEnd.Configuration.ErrorResponse.TheValueAlreadyExists;
import MockProjectBackEnd.DTO.SanPhamDTOs.AnhMinhHoaDTO;
import MockProjectBackEnd.DTO.SanPhamDTOs.SanPhamDTO;
import MockProjectBackEnd.Entity.SanPhamEntities.AnhMinhHoa;
import MockProjectBackEnd.Entity.SanPhamEntities.SanPham;
import MockProjectBackEnd.Form.SanPhamForms.SanPham.SanPhamCreateForm;
import MockProjectBackEnd.Form.SanPhamForms.SanPham.SanPhamFilterForm;
import MockProjectBackEnd.Form.SanPhamForms.SanPham.SanPhamUpdateForm;
import MockProjectBackEnd.Services.SanPhamServices.AnhMinhHoa.IAnhMinhHoaService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import MockProjectBackEnd.Services.SanPhamServices.SanPham.ISanPhamService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/SanPham")
@CrossOrigin(origins = "*")
public class SanPhamController{
    @Autowired
    private ISanPhamService service;

    @Autowired
    private IAnhMinhHoaService anhMinhHoaService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<SanPhamDTO> getAllSanPham(Pageable pageable,
                                          @RequestParam(name = "search", required = false) String search,
                                          SanPhamFilterForm form){

        //Chuyển từ Page SanPham -> Page SanPhamDTO
        Page<SanPham> entities = service.getAllSanPham(pageable, search, form);
        List<SanPhamDTO> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<SanPhamDTO>>() {}.getType());

        Page<SanPhamDTO> dtosPages = new PageImpl<>(dtos, pageable, entities.getTotalElements());


        //Tìm các URL của ảnh liên quan đưa vào cho từng SanPhamDTO
        for (SanPhamDTO dto: dtos) {

            List<AnhMinhHoa> danhSachAnh = anhMinhHoaService.getAnhMinhHoaByMaSanPham(dto.getMaSanPham());
            List<AnhMinhHoaDTO> listAnhDTO = modelMapper.map(danhSachAnh, new TypeToken<List<AnhMinhHoaDTO>>() {}.getType());

            dto.setDanhSachAnhMinhHoa(listAnhDTO);
        }


        return dtosPages;
    }

    @GetMapping("/{maSanPham}")
    public SanPhamDTO getSanPhamByID(@PathVariable Integer maSanPham){

        //Tìm sản phẩm
        SanPham entites = service.getSanPhamByID(maSanPham);


        //Chuyển sang DTO bằng ModelMapper
        SanPhamDTO dtos = modelMapper.map(entites, SanPhamDTO.class);


        //TÌm danh sách các ảnh liên quan của sản phẩm
        List<AnhMinhHoa> danhSachAnh = anhMinhHoaService.getAnhMinhHoaByMaSanPham(maSanPham);

        //Chuyển các ảnh sang DTO để đưa vào SanPhamDTO
        List<AnhMinhHoaDTO> listAnhDTO = modelMapper.map(danhSachAnh, new TypeToken<List<AnhMinhHoaDTO>>() {}.getType());

        dtos.setDanhSachAnhMinhHoa(listAnhDTO);

        return dtos;
    }


    @PostMapping()
    public SanPhamDTO createSanPham(@RequestBody @Valid SanPhamCreateForm form) throws TheValueAlreadyExists {

        SanPham sanPham = service.createSanPham(form);

        SanPhamDTO sanPhamDTO = modelMapper.map(sanPham, SanPhamDTO.class);

        //TÌm danh sách các ảnh liên quan của sản phẩm
        List<AnhMinhHoa> danhSachAnh = anhMinhHoaService.getAnhMinhHoaByMaSanPham(sanPham.getMaSanPham());

        //Chuyển các ảnh sang DTO để đưa vào SanPhamDTO
        List<AnhMinhHoaDTO> listAnhDTO = modelMapper.map(danhSachAnh, new TypeToken<List<AnhMinhHoaDTO>>() {}.getType());

        sanPhamDTO.setDanhSachAnhMinhHoa(listAnhDTO);

        return sanPhamDTO;
    }

    @PatchMapping(value = "/{maSanPham}")
    public SanPhamDTO updateSanPham(@PathVariable Integer maSanPham
                                        ,@RequestBody @Valid SanPhamUpdateForm form) throws TheValueAlreadyExists{

        SanPham sanPham = service.updateSanPham(maSanPham, form);

        SanPhamDTO sanPhamDTO = modelMapper.map(sanPham, SanPhamDTO.class);

        return sanPhamDTO;
    }

}
