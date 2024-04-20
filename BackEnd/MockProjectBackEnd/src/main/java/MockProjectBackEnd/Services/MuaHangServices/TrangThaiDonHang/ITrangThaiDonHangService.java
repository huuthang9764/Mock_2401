package MockProjectBackEnd.Services.MuaHangServices.TrangThaiDonHang;

import MockProjectBackEnd.Entity.MuaHangEntities.TrangThaiDonHang;
import MockProjectBackEnd.Form.MuaHangForms.TrangThaiDonHang.TrangThaiDonHangCreateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface ITrangThaiDonHangService {

    List<TrangThaiDonHang> getAllTrangThaiDonHang(Integer maDonHang);

    TrangThaiDonHang trangThaiDonHangMoiNhat(Integer maDonHang);


    void createTrangThaiDonHang(Integer maDonHang) ;

    void createTrangThaiDonHang(Integer maDonHang, TrangThaiDonHangCreateForm form);
}
