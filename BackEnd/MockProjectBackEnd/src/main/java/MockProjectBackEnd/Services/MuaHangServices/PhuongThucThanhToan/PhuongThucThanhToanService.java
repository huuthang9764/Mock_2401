package MockProjectBackEnd.Services.MuaHangServices.PhuongThucThanhToan;

import MockProjectBackEnd.Entity.MuaHangEntities.PhuongThucThanhToan;
import MockProjectBackEnd.Repositories.MuaHangRepositories.IPhuongThucThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PhuongThucThanhToanService implements IPhuongThucThanhToanService {

    @Autowired
    private IPhuongThucThanhToanRepository phuongThucThanhToanRepository;

    @Override
    public Page<PhuongThucThanhToan> getAllPhuongThucThanhToan(Pageable pageable) {
        return phuongThucThanhToanRepository.findAll(pageable);
    }

    @Override
    public PhuongThucThanhToan getPhuongThucThanhToanById(Integer maPhuongThuc) {
        return phuongThucThanhToanRepository.findById(maPhuongThuc).get();
    }
}
