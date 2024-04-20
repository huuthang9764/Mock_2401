package MockProjectBackEnd.Repositories.TaiKhoanRepositories;

import MockProjectBackEnd.Entity.TaiKhoanEntities.RegistrationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRegistrationTokenRepository extends JpaRepository<RegistrationToken, Integer> {

    RegistrationToken findByTaiKhoan_MaTaiKhoan(Integer maTaiKhoan);

    RegistrationToken findByToken(String token);


}
