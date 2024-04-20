package MockProjectBackEnd.Services.MuaHangServices.DiaChi;

import MockProjectBackEnd.Entity.MuaHangEntities.DiaChi;
import MockProjectBackEnd.Form.MuaHangForms.DiaChi.DiaChiCreateForm;
import MockProjectBackEnd.Form.MuaHangForms.DiaChi.DiaChiUpdateForm;
import MockProjectBackEnd.Repositories.MuaHangRepositories.IDiaChiRepository;
import MockProjectBackEnd.Services.TaiKhoanServices.NguoiDung.INguoiDungService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DiaChiService implements IDiaChiService{

    @Autowired
    private IDiaChiRepository diaChiRepository;


    @Autowired
    private INguoiDungService nguoiDungService;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<DiaChi> getAllDiaChiByMaNguoiDung(Integer maNguoiDung) {
        return diaChiRepository.findByMaNguoiDungAndTrangThaiTonTai(maNguoiDung, true);
    }

    @Override
    public DiaChi getDiaChiByMaDiaChi(Integer maDiaChi) {
        return diaChiRepository.findById(maDiaChi).get();
    }

    @Override
    @Transactional
    public DiaChi createDiaChi(DiaChiCreateForm form) {
        DiaChi diaChi = modelMapper.map(form, DiaChi.class);
        diaChi.setMaDiaChi(null);
        diaChi.setNguoiDung(nguoiDungService.getNguoiDungByMaNguoiDung(form.getMaNguoiDung()));
        return diaChiRepository.save(diaChi);
    }

    @Override
    @Transactional
    public DiaChi updateDiaChi(Integer maDiaChi, DiaChiUpdateForm form) {
        DiaChi diaChi = getDiaChiByMaDiaChi(maDiaChi);

        if (form.getQuocGia() != null) {
            diaChi.setQuocGia(form.getQuocGia());
        }

        if (form.getTinh() != null) {
            diaChi.setTinh(form.getTinh());
        }

        if (form.getQuan() != null) {
            diaChi.setQuan(form.getQuan());
        }

        if (form.getPhuong() != null) {
            diaChi.setPhuong(form.getPhuong());
        }

        if (form.getSoNha() != null) {
            diaChi.setSoNha(form.getSoNha());
        }

        if (form.getTrangThaiMacDinh() != null) {
            diaChi.setTrangThaiMacDinh(form.getTrangThaiMacDinh());
        }

        return diaChiRepository.save(diaChi);
    }

    @Override
    @Transactional
    public void deleteDiaChi(Integer maDiaChi) {
        DiaChi diaChi = diaChiRepository.findById(maDiaChi).get();
        diaChi.setTrangThaiTonTai(false);
    }
}
