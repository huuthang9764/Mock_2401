package MockProjectBackEnd.Repositories.TaiKhoanRepositories;

import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ITaiKhoanRepository extends JpaRepository<TaiKhoan, Integer>, JpaSpecificationExecutor<TaiKhoan> {

        TaiKhoan findByNguoiDung_Email(String email);

}
