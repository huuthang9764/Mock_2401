package MockProjectBackEnd.Repositories.SanPhamRepositories;

import MockProjectBackEnd.Entity.SanPhamEntities.ThuongHieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IThuongHieuRepository extends JpaRepository<ThuongHieu, Integer>, JpaSpecificationExecutor<ThuongHieu> {
    boolean existsByTenThuongHieu(String tenThuongHieu);

}
