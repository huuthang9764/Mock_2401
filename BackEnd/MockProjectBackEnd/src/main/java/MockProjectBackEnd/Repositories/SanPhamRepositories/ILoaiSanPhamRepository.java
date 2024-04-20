package MockProjectBackEnd.Repositories.SanPhamRepositories;

import MockProjectBackEnd.Entity.SanPhamEntities.LoaiSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ILoaiSanPhamRepository extends JpaRepository<LoaiSanPham, Integer>, JpaSpecificationExecutor<LoaiSanPham> {
    boolean existsByTenLoaiSanPham(String tenLoaiSanPham);
}
