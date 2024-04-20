package MockProjectBackEnd.Controller.MuaHangControllers;

import MockProjectBackEnd.DTO.MuaHangDTOs.PhuongThucThanhToanDTO;
import MockProjectBackEnd.Entity.MuaHangEntities.PhuongThucThanhToan;
import MockProjectBackEnd.Services.MuaHangServices.PhuongThucThanhToan.IPhuongThucThanhToanService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/PhuongThucThanhToan")
@CrossOrigin(origins = "*")
public class PhuongThucThanhToanController {
    @Autowired
    private IPhuongThucThanhToanService phuongThucThanhToanService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<PhuongThucThanhToanDTO> getAllPhuongThucThanhToan(Pageable pageable) {
        Page<PhuongThucThanhToan> entities = phuongThucThanhToanService.getAllPhuongThucThanhToan(pageable);

        List<PhuongThucThanhToanDTO> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<PhuongThucThanhToanDTO>>() {}.getType());

        return new PageImpl<>(dtos, pageable, entities.getTotalElements());
    }
}