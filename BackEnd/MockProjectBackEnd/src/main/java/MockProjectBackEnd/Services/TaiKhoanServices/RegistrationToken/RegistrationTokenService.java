package MockProjectBackEnd.Services.TaiKhoanServices.RegistrationToken;

import MockProjectBackEnd.Entity.TaiKhoanEntities.RegistrationToken;
import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import MockProjectBackEnd.Repositories.TaiKhoanRepositories.IRegistrationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service

public class RegistrationTokenService implements IRegistrationTokenService{

    @Autowired
    private IRegistrationTokenRepository registrationTokenRepository;


    //Lấy Token dựa tên ID
    @Override
    public RegistrationToken getRegistrationTokenById(Integer id) {
        return registrationTokenRepository.findById(id).get();
    }

    //Lấy Token dựa trên Mã tài khoản tương ứng
    @Override
    public RegistrationToken getRegistrationTokenByMaTaiKhoan(Integer maTaiKhoan) {
        return registrationTokenRepository.findByTaiKhoan_MaTaiKhoan(maTaiKhoan);
    }

    //Lấy Token dựa trên mã Token
    @Override
    public RegistrationToken getRegistrationTokenByToken(String token) {
        return registrationTokenRepository.findByToken(token);
    }


    //Tạo Token
    @Override
    @Transactional
    public RegistrationToken createRegistrationToken(TaiKhoan taiKhoan) {

        RegistrationToken registrationToken = new RegistrationToken();

        //Tạo token bằng mã UUID
        String token = UUID.randomUUID().toString();

        registrationToken.setToken(token);
        registrationToken.setMaTaiKhoan(taiKhoan.getMaTaiKhoan());

        return registrationTokenRepository.save(registrationToken);
    }


    //Xóa token
    @Override
    @Transactional
    public void deleteRegistrationToken(Integer id) {
        registrationTokenRepository.deleteById(id);
    }
}
