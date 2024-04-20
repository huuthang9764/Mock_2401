package MockProjectBackEnd.Repositories.SanPhamRepositories;

import MockProjectBackEnd.Entity.SanPhamEntities.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ISanPhamRepository extends JpaRepository<SanPham,Integer>, JpaSpecificationExecutor<SanPham> {
    boolean existsByTenSanPham(String tenSanPham);

    List<SanPham> findByLoaiSanPham_MaLoaiSanPham(Integer maLoaiSanPham);

    List<SanPham> findByThuongHieu_MaThuongHieu(Integer maThuongHieu);
}
