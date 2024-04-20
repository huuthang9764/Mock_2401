package MockProjectBackEnd.Repositories.MuaHangRepositories;

import MockProjectBackEnd.Entity.MuaHangEntities.GioHang;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IGioHangRepository extends JpaRepository<GioHang, GioHang.GioHangPK> {

    List<GioHang> findByTaiKhoan_MaTaiKhoan(Integer maTaiKhoan);

}
