package MockProjectBackEnd.Repositories.TaiKhoanRepositories;

import MockProjectBackEnd.Entity.TaiKhoanEntities.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;

public interface INguoiDungRepository extends JpaRepository<NguoiDung, Integer> {
    boolean existsByEmail(String email);
}
