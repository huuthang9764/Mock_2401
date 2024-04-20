package MockProjectBackEnd.Services.MuaHangServices.DiaChi;

import MockProjectBackEnd.Entity.MuaHangEntities.DiaChi;
import MockProjectBackEnd.Entity.MuaHangEntities.GioHang;
import MockProjectBackEnd.Form.MuaHangForms.DiaChi.DiaChiCreateForm;
import MockProjectBackEnd.Form.MuaHangForms.DiaChi.DiaChiUpdateForm;
import MockProjectBackEnd.Form.MuaHangForms.GioHang.GioHangCreateForm;
import MockProjectBackEnd.Form.MuaHangForms.GioHang.GioHangUpdateForm;

import java.util.List;

public interface IDiaChiService {
    List<DiaChi> getAllDiaChiByMaNguoiDung(Integer maNguoiDung);

    DiaChi getDiaChiByMaDiaChi(Integer maDiaChi);

    DiaChi createDiaChi(DiaChiCreateForm form);

    DiaChi updateDiaChi(Integer maDiaChi, DiaChiUpdateForm form);

    void deleteDiaChi(Integer maDiaChi);
}
