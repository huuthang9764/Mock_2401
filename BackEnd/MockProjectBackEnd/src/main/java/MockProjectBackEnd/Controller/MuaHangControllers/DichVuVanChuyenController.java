package MockProjectBackEnd.Controller.MuaHangControllers;

import MockProjectBackEnd.DTO.MuaHangDTOs.DichVuVanChuyenDTO;
import MockProjectBackEnd.DTO.MuaHangDTOs.GioHangDTO;
import MockProjectBackEnd.Entity.MuaHangEntities.DichVuVanChuyen;
import MockProjectBackEnd.Services.MuaHangServices.DichVuVanChuyen.IDichVuVanChuyenService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
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
@RequestMapping(value = "/DichVuVanChuyen")
@CrossOrigin(origins = "*")
public class DichVuVanChuyenController {
    @Autowired
    private IDichVuVanChuyenService dichVuVanChuyenService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<DichVuVanChuyenDTO> getAllDichVuVanChuyen(Pageable pageable){

        Page<DichVuVanChuyen> entities =  dichVuVanChuyenService.getAllDichVuVanChuyen(pageable);

        List<DichVuVanChuyenDTO> dtos = modelMapper.map(entities.getContent(), new TypeToken<List<DichVuVanChuyenDTO>>() {}.getType() );


        return new PageImpl<>(dtos, pageable, entities.getTotalElements());
    }
}
