package MockProjectBackEnd.Controller.TaiKhoanControllers;

import MockProjectBackEnd.Configuration.ErrorResponse.NotActiveException;
import MockProjectBackEnd.DTO.TaiKhoanDTOs.LoginInfoDTO;
import MockProjectBackEnd.Form.TaiKhoanForms.Login.LoginInputForm;
import MockProjectBackEnd.Services.TaiKhoanServices.JWT.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private AuthService authService;

    //API Login
    @PostMapping("/signin")
    public ResponseEntity<LoginInfoDTO> signIn(@RequestBody LoginInputForm signInRequest) throws NotActiveException {

        LoginInfoDTO dto = authService.signIn(signInRequest);

        if (dto.getStatusCode() != 500){
            if (!dto.getTrangThai()){
                dto = new LoginInfoDTO();
                dto.setStatusCode(500);
                dto.setError("Tài khoản của bạn đã bị khóa !!!");
            }
        }

        return ResponseEntity.ok(dto);
    }
    @PostMapping("/refresh")
    public ResponseEntity<LoginInfoDTO> refreshToken(@RequestParam String token){
        return ResponseEntity.ok(authService.refreshToken(token));
    }
}

