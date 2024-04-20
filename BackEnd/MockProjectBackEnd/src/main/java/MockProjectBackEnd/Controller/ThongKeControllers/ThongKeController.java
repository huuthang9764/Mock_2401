package MockProjectBackEnd.Controller.ThongKeControllers;

import MockProjectBackEnd.DTO.ThongKeDTOs.DonHang.ThongKeDonHangDTO;
import MockProjectBackEnd.DTO.ThongKeDTOs.ThongKeTongQuatDTO;
import MockProjectBackEnd.Form.MuaHangForms.DonHang.DonHangFillerForm;
import MockProjectBackEnd.Services.ThongKeServices.IThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/ThongKe")
@CrossOrigin(origins = "*")
public class ThongKeController {

    @Autowired
    private IThongKeService thongKeService;

    @GetMapping(value = "/TongQuat")
    private ThongKeTongQuatDTO thongKeTongQuat(){
        return thongKeService.thongKeTongQuat();
    }

    @GetMapping("/DonHang")
    public List<ThongKeDonHangDTO> getThongKeDonHang(DonHangFillerForm form) {
        return thongKeService.thongKeDonHang(form);
    }

//    @GetMapping("/DoanhThu")
//    public List<ThongKeDonHangDTO> doanhThuTheoNgay(DonHangFillerForm form) {
//        return thongKeService.thongKeDonHang(form);
//    }

}
