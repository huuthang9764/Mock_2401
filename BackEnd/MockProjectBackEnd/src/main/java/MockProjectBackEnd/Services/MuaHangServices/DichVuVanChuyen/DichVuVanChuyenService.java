package MockProjectBackEnd.Services.MuaHangServices.DichVuVanChuyen;

import MockProjectBackEnd.Entity.MuaHangEntities.DichVuVanChuyen;
import MockProjectBackEnd.Repositories.MuaHangRepositories.IDichVuVanChuyenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DichVuVanChuyenService implements IDichVuVanChuyenService{

    @Autowired
    private IDichVuVanChuyenRepository dichVuVanChuyenRepository;

    @Override
    public Page<DichVuVanChuyen> getAllDichVuVanChuyen(Pageable pageable) {
        return dichVuVanChuyenRepository.findAll(pageable);
    }

    @Override
    public DichVuVanChuyen getDichVuVanChuyenById(Integer maDichVu) {
        return dichVuVanChuyenRepository.findById(maDichVu).orElse(null);
    }
}
