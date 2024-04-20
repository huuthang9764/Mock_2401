package MockProjectBackEnd.Services.MuaHangServices.GioHang;

import MockProjectBackEnd.Entity.MuaHangEntities.GioHang;
import MockProjectBackEnd.Form.MuaHangForms.GioHang.GioHangCreateForm;
import MockProjectBackEnd.Form.MuaHangForms.GioHang.GioHangUpdateForm;

import java.util.List;

public interface IGioHangService {

    List<GioHang> getAllGioHangByMaTaiKhoan(Integer maTaiKhoan);

    GioHang createGioHang(GioHangCreateForm form);

    GioHang updateGioHang(GioHangUpdateForm form);

    void deleteGioHang(Integer maTaiKhoan, Integer maSanPham);

}
