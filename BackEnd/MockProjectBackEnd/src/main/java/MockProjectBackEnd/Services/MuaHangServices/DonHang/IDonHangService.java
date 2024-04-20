package MockProjectBackEnd.Services.MuaHangServices.DonHang;

import MockProjectBackEnd.Entity.MuaHangEntities.DonHang;
import MockProjectBackEnd.Entity.MuaHangEntities.TrangThai;
import MockProjectBackEnd.Form.MuaHangForms.DonHang.DonHangCreateForm;
import MockProjectBackEnd.Form.MuaHangForms.DonHang.DonHangFillerForm;
import MockProjectBackEnd.Form.MuaHangForms.DonHang.DonHangUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IDonHangService {
    Page<DonHang> getAllDonHang(DonHangFillerForm form, Pageable pageable);

    List<DonHang> getAllDonHangByMaKhachHang(Integer maKhachHang);


    DonHang getAllDonHangByMaDonHang(Integer maDonHang);


    Integer getDonHangInCurrentMonth();

    Integer getDonHangInPreviousMonth();

    Integer getDonHangInCurrentMonthAccoundingToStatus(TrangThai trangThai);

    Integer getDonHangInPreviousMonthAccoundingToStatus(TrangThai trangThai);

    Integer getProfitByMonth();

    Integer getProfitByPreviousMonth();

    Integer getProfitToday();

    Integer getProfitPreviousDay();

    DonHang getDonHangByMaDonHang(Integer maDonHang);

    List<Object[]> thongKeDonHang(DonHangFillerForm form);

//    List<Object[]> thongKeDoanhThuTheoNgay(DonHangFillerForm form);

    DonHang createDonHang(DonHangCreateForm form);

    DonHang updateDonHang(Integer maDonHang, DonHangUpdateForm form);
}