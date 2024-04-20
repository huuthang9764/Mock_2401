package MockProjectBackEnd.Repositories.MuaHangRepositories;

import MockProjectBackEnd.Entity.MuaHangEntities.CTDH;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICTDHRepository extends JpaRepository<CTDH, CTDH.CTDHPK> {

    List<CTDH> findAllByDonHang_MaDonHang(Integer maDonHang);

}
