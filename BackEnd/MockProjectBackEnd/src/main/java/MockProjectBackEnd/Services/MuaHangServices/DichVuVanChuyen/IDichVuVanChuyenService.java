package MockProjectBackEnd.Services.MuaHangServices.DichVuVanChuyen;


import MockProjectBackEnd.Entity.MuaHangEntities.DichVuVanChuyen;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IDichVuVanChuyenService {
    Page<DichVuVanChuyen> getAllDichVuVanChuyen(Pageable pageable);

    DichVuVanChuyen getDichVuVanChuyenById(Integer maDichVu);
}
