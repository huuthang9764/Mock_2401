package MockProjectBackEnd.Services.MuaHangServices.PhuongThucThanhToan;

import MockProjectBackEnd.Entity.MuaHangEntities.PhuongThucThanhToan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IPhuongThucThanhToanService {
    Page<PhuongThucThanhToan> getAllPhuongThucThanhToan(Pageable pageable);

    PhuongThucThanhToan getPhuongThucThanhToanById(Integer maPhuongThuc);
}
