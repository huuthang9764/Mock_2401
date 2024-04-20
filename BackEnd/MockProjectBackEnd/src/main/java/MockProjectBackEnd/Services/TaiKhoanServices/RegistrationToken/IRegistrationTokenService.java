package MockProjectBackEnd.Services.TaiKhoanServices.RegistrationToken;

import MockProjectBackEnd.Entity.TaiKhoanEntities.RegistrationToken;
import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import org.springframework.stereotype.Service;

public interface IRegistrationTokenService {

    RegistrationToken getRegistrationTokenById(Integer id);

    RegistrationToken getRegistrationTokenByMaTaiKhoan(Integer maTaiKhoan);

    RegistrationToken getRegistrationTokenByToken(String token);

    RegistrationToken createRegistrationToken(TaiKhoan taiKhoan);

    void deleteRegistrationToken(Integer id);


}
