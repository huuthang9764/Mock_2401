package MockProjectBackEnd.Controller.TaiKhoanControllers;

import MockProjectBackEnd.Configuration.ErrorResponse.TheValueAlreadyExists;
import MockProjectBackEnd.DTO.TaiKhoanDTOs.TaiKhoanDTO;
import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanCreateForm;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanFilterForm;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanUpdateForm;
import MockProjectBackEnd.Services.TaiKhoanServices.RegistrationToken.IRegistrationTokenService;
import MockProjectBackEnd.Services.TaiKhoanServices.TaiKhoan.ITaiKhoanService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/TaiKhoan")
@CrossOrigin(origins = "*")
public class TaiKhoanController {

    @Autowired
    private ITaiKhoanService taiKhoanService;

    @Autowired
    private IRegistrationTokenService registrationTokenService;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    public Page<TaiKhoanDTO> getAllTaiKhoan(Pageable pageable,
                                            @RequestParam(name = "search", required = false) String search,
                                            TaiKhoanFilterForm form) {
        Page<TaiKhoan> taiKhoanPage = taiKhoanService.getAllTaiKhoan(pageable, search, form);
        List<TaiKhoanDTO> taiKhoanDTOs = modelMapper.map(taiKhoanPage.getContent(),
            new TypeToken<List<TaiKhoanDTO>>() {}.getType());
        return new PageImpl<>(taiKhoanDTOs, pageable, taiKhoanPage.getTotalElements());
    }

    @GetMapping("/{maTaiKhoan}")
    public TaiKhoanDTO getTaiKhoanByID(@PathVariable Integer maTaiKhoan) {
        TaiKhoan taiKhoan = taiKhoanService.getTaiKhoanByID(maTaiKhoan);
        return modelMapper.map(taiKhoan, TaiKhoanDTO.class);
    }


    //API Kích hoạt tài khoản
    @GetMapping("/activeUser")
    public ResponseEntity<?> activeUserViaEmail(@RequestParam String token) {
        int flag = taiKhoanService.activeUser(token);
        switch (flag){
            case 0:
                return new ResponseEntity<>("Active success!", HttpStatus.OK);
            case 1:
                return new ResponseEntity<>("Token của bạn đã hết hạn xin hãy tạo lại tài khoản !!", HttpStatus.OK);
            case 2:
                return new ResponseEntity<>("Token này đã không còn tồn tại !!", HttpStatus.OK);
        }
        return null;
    }

    @PostMapping()
    /****************************************
     * MÔ TẢ NGHIỆP VỤ REGISTER
     *      1. User call API Tạo Tài khoản
     *      2. Tài khoản được tạo ra nhưng chưa kích hoạt
     *      3. Hệ thống gửi API xác nhận (Token) tới email của User. Token có thời hạn là 2 tiếng
     *      4. Khi User click vào API Xác nhận trong email.
     *              Nếu Token hợp lệ thì người dùng có thể đăng nhập tài khoản bình thường
     *              Nếu Token hết hạn thì user phải register lại
     *********************************/
    public TaiKhoanDTO createTaiKhoan(@RequestBody @Valid TaiKhoanCreateForm form) throws TheValueAlreadyExists {
        TaiKhoan taiKhoan = taiKhoanService.createTaiKhoan(form);

        TaiKhoanDTO taiKhoanDTO = modelMapper.map(taiKhoan, TaiKhoanDTO.class);
        taiKhoanDTO.setNguoiDungHoTen(form.getHoTen());
        taiKhoanDTO.setNguoiDungNgaySinh(form.getNgaySinh());
        taiKhoanDTO.setNguoiDungSoDienThoai(form.getSoDienThoai());
        taiKhoanDTO.setNguoiDungGioiTinh(form.getGioiTinh());
        taiKhoanDTO.setNguoiDungEmail(form.getEmail());

        return taiKhoanDTO;
    }

    @PatchMapping("/{maTaiKhoan}")
    public TaiKhoanDTO updateTaiKhoan(@PathVariable Integer maTaiKhoan,
                                      @RequestBody @Valid TaiKhoanUpdateForm form) throws TheValueAlreadyExists {
        TaiKhoan taiKhoan = taiKhoanService.updateTaiKhoan(maTaiKhoan, form);
        return modelMapper.map(taiKhoan, TaiKhoanDTO.class);
    }
}