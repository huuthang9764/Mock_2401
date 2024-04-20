package MockProjectBackEnd.Repositories.MuaHangRepositories;

import MockProjectBackEnd.Entity.MuaHangEntities.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IDiaChiRepository extends JpaRepository<DiaChi, Integer> {
    List<DiaChi> findByMaNguoiDungAndTrangThaiTonTai(Integer maNguoiDung, boolean trangThaiTonTai);
}
