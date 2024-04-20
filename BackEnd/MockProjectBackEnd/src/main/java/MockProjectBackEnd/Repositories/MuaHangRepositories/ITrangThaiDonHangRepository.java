package MockProjectBackEnd.Repositories.MuaHangRepositories;

import MockProjectBackEnd.Entity.MuaHangEntities.TrangThaiDonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface ITrangThaiDonHangRepository extends JpaRepository<TrangThaiDonHang, TrangThaiDonHang.TrangThaiDonHangPK>, JpaSpecificationExecutor<TrangThaiDonHang> {
    List<TrangThaiDonHang> findAllTrangThaiDonHangByDonHang_MaDonHang(Integer maDonHang);

    Optional<TrangThaiDonHang> findFirstByDonHangMaDonHangOrderByNgayCapNhatDesc(Integer maDonHang);

//    @Query("SELECT t FROM TrangThaiDonHang t WHERE t.donHang.maDH = :maDH ORDER BY t.id.ngayCapNhat DESC")
//    Optional<TrangThaiDonHang> findLatestTrangThaiByMaDH(@Param("maDH") Integer maDH);

}
