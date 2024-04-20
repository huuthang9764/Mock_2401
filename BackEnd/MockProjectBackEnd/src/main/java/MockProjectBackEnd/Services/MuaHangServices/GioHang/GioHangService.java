package MockProjectBackEnd.Services.MuaHangServices.GioHang;

import MockProjectBackEnd.Entity.MuaHangEntities.GioHang;
import MockProjectBackEnd.Form.MuaHangForms.GioHang.GioHangCreateForm;
import MockProjectBackEnd.Form.MuaHangForms.GioHang.GioHangUpdateForm;
import MockProjectBackEnd.Repositories.MuaHangRepositories.IGioHangRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GioHangService implements IGioHangService {

    @Autowired
    private IGioHangRepository gioHangRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<GioHang> getAllGioHangByMaTaiKhoan(Integer maTaiKhoan) {
        return gioHangRepository.findByTaiKhoan_MaTaiKhoan(maTaiKhoan);
    }

    @Override
    @Transactional
    public GioHang createGioHang(GioHangCreateForm form) {

        GioHang gioHang = modelMapper.map(form, GioHang.class);

        GioHang.GioHangPK id = new GioHang.GioHangPK();
        id.setMaSanPham(form.getMaSanPham());
        id.setMaTaiKhoan(form.getMaTaiKhoan());
        gioHang.setId(id);


        return gioHangRepository.save(gioHang);
    }

    @Override
    @Transactional

    public GioHang updateGioHang(GioHangUpdateForm form) {

        GioHang.GioHangPK id = new GioHang.GioHangPK();
        id.setMaSanPham(form.getMaSanPham());
        id.setMaTaiKhoan(form.getMaTaiKhoan());

        GioHang gioHang = gioHangRepository.findById(id).get();

        if (form.getDonGia() != null){
            gioHang.setDonGia(form.getDonGia());
        }

        if (form.getSoLuong() != null){
            gioHang.setSoLuong(form.getSoLuong());
        }

        if (form.getThanhTien() != null){
            gioHang.setThanhTien(form.getThanhTien());
        }

        return gioHangRepository.save(gioHang);
    }

    @Override
    @Transactional
    public void deleteGioHang(Integer maTaiKhoan, Integer maSanPham) {

        GioHang.GioHangPK id = new GioHang.GioHangPK();
        id.setMaSanPham(maSanPham);
        id.setMaTaiKhoan(maTaiKhoan);
        gioHangRepository.deleteById(id);
    }
}
