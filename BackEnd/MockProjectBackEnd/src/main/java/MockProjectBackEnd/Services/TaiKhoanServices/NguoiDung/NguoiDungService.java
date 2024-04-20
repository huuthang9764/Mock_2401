package MockProjectBackEnd.Services.TaiKhoanServices.NguoiDung;

import MockProjectBackEnd.Entity.TaiKhoanEntities.NguoiDung;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanCreateForm;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanUpdateForm;
import MockProjectBackEnd.Repositories.TaiKhoanRepositories.INguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NguoiDungService implements INguoiDungService{

    @Autowired
    private INguoiDungRepository repository;

    @Override
    public NguoiDung getNguoiDungByMaNguoiDung(Integer maNguoiDung) {
        return repository.findById(maNguoiDung).get();
    }

    @Override
    @Transactional

    public NguoiDung createNguoiDung(Integer maTaiKhoan, TaiKhoanCreateForm form) {

        NguoiDung nguoiDung = new NguoiDung();
        nguoiDung.setMaNguoiDung(maTaiKhoan);
        nguoiDung.setEmail(form.getEmail());
        nguoiDung.setGioiTinh(form.getGioiTinh());
        nguoiDung.setHoTen(form.getHoTen());
        nguoiDung.setSoDienThoai(form.getSoDienThoai());
        nguoiDung.setNgaySinh(form.getNgaySinh());
        return repository.save(nguoiDung);
    }

    @Override
    public boolean isEmailExists(String email) {
        return repository.existsByEmail(email);
    }

    @Override
    @Transactional

    public NguoiDung updateNguoiDung(Integer maNguoiDung, TaiKhoanUpdateForm form) {

        NguoiDung nguoiDung = repository.findById(maNguoiDung).get();

        if (form.getHoTen() != null){
            nguoiDung.setHoTen(form.getHoTen());
        }

        if (form.getGioiTinh() != null){
            nguoiDung.setGioiTinh(form.getGioiTinh());
        }

        if (form.getNgaySinh() != null){
            nguoiDung.setNgaySinh(form.getNgaySinh());
        }

        if (form.getSoDienThoai() != null){
            nguoiDung.setSoDienThoai(form.getSoDienThoai());
        }

        return repository.save(nguoiDung);
    }

    @Override
    @Transactional
    public void deleteNguoiDung(Integer maNguoiDung){
        repository.deleteById(maNguoiDung);
    }
}
