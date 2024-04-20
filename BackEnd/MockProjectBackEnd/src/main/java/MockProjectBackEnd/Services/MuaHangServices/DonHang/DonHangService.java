package MockProjectBackEnd.Services.MuaHangServices.DonHang;

import MockProjectBackEnd.Entity.MuaHangEntities.*;
import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import MockProjectBackEnd.Form.MuaHangForms.ChiTietDonHang.CTDHCreateForm;
import MockProjectBackEnd.Form.MuaHangForms.DonHang.DonHangCreateForm;
import MockProjectBackEnd.Form.MuaHangForms.DonHang.DonHangFillerForm;
import MockProjectBackEnd.Form.MuaHangForms.DonHang.DonHangUpdateForm;
import MockProjectBackEnd.Form.MuaHangForms.TrangThaiDonHang.TrangThaiDonHangCreateForm;
import MockProjectBackEnd.Others.CustomUtils;
import MockProjectBackEnd.Repositories.MuaHangRepositories.IDonHangRepository;
import MockProjectBackEnd.Services.MuaHangServices.ChiTietDonHang.ICTDHService;
import MockProjectBackEnd.Services.MuaHangServices.DiaChi.IDiaChiService;
import MockProjectBackEnd.Services.MuaHangServices.DichVuVanChuyen.IDichVuVanChuyenService;
import MockProjectBackEnd.Services.MuaHangServices.GioHang.IGioHangService;
import MockProjectBackEnd.Services.MuaHangServices.PhuongThucThanhToan.IPhuongThucThanhToanService;
import MockProjectBackEnd.Services.MuaHangServices.TrangThaiDonHang.ITrangThaiDonHangService;
import MockProjectBackEnd.Services.TaiKhoanServices.TaiKhoan.ITaiKhoanService;
import MockProjectBackEnd.Specification.MuaHangSpecification.DonHang.DonHangSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DonHangService implements IDonHangService {

    @Autowired
    private IDonHangRepository donHangRepository;

    @Autowired
    private IDiaChiService diaChiService;

    @Autowired
    private ITaiKhoanService taiKhoanService;

    @Autowired
    private ICTDHService ctdhService;

    @Autowired
    private ITrangThaiDonHangService trangThaiDonHangService;

    @Autowired
    private IPhuongThucThanhToanService phuongThucThanhToanService;

    @Autowired
    private IDichVuVanChuyenService dichVuVanChuyenService;

    @Autowired
    private IGioHangService gioHangService;


    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Page<DonHang> getAllDonHang(DonHangFillerForm form, Pageable pageable) {
        Specification<DonHang> buildWhere = DonHangSpecification.buildWhere(form);

        return donHangRepository.findAll(buildWhere, pageable);
    }

    @Override
    public List<DonHang> getAllDonHangByMaKhachHang(Integer maKhachHang) {
        return donHangRepository.findAllByMaKhachHang_MaTaiKhoan(maKhachHang);
    }

    @Override
    public DonHang getAllDonHangByMaDonHang(Integer maDonHang) {
        return donHangRepository.findById(maDonHang).get();
    }

    @Override
    public Integer getDonHangInCurrentMonth() {
        return donHangRepository.soDonHangTrongThang();
    }

    @Override
    public Integer getDonHangInPreviousMonth() {
        return donHangRepository.soDonHangThangTruoc();
    }

    @Override
    public Integer getDonHangInCurrentMonthAccoundingToStatus(TrangThai trangThai) {
        return donHangRepository.soDonHangTrongThangTheoTrangThai(trangThai.toString());
    }

    @Override
    public Integer getDonHangInPreviousMonthAccoundingToStatus(TrangThai trangThai) {
        return donHangRepository.soDonHangThangTruocTheoTrangThai(trangThai.toString());
    }

    @Override
    public Integer getProfitByMonth() {
        return donHangRepository.doanhThuThangNay();
    }

    @Override
    public Integer getProfitByPreviousMonth() {
        return donHangRepository.doanhThuThangTruoc();
    }

    @Override
    public Integer getProfitToday() {
        return donHangRepository.doanhThuHomNay();
    }

    @Override
    public Integer getProfitPreviousDay() {
        return donHangRepository.doanhThuHomQua();
    }

    @Override
    public DonHang getDonHangByMaDonHang(Integer maDonHang) {
        return donHangRepository.findById(maDonHang).get();
    }

    @Override
    public List<Object[]> thongKeDonHang(DonHangFillerForm form) {
        return donHangRepository.thongKeDonHangTheoNgayVaTrangThai(
            CustomUtils.convertDateToString(form.getMinDate()),
            CustomUtils.convertDateToString(form.getMaxDate()));
    }

//    @Override
//    public List<Object[]> thongKeDoanhThuTheoNgay(DonHangFillerForm form) {
//        return donHangRepository.thongKeDoanhThuTheoNgay(
//                CustomUtils.convertDateToString(form.getMinDate()),
//                CustomUtils.convertDateToString(form.getMaxDate()));
//    }


    @Override
    @Transactional
    public DonHang createDonHang(DonHangCreateForm form) {
        DonHang donHang = modelMapper.map(form, DonHang.class);

        // Tìm ra địa chỉ giao hàng
        DiaChi diaChi;
        if (form.getMaDiaChi() != null){
            diaChi = diaChiService.getDiaChiByMaDiaChi(form.getMaDiaChi());
        }else{
            diaChi = diaChiService.createDiaChi(form.getDiaChiGiaoHang());
        }
        donHang.setMaDiaChi(diaChi);

        //TÌm khách hàng
        donHang.setMaDonHang(null);
        TaiKhoan khachHang = taiKhoanService.getTaiKhoanByID(form.getMaKhachHang());
        donHang.setMaKhachHang(khachHang);

        // Tạo dịch vụ vận chuyển
        PhuongThucThanhToan phuongThucThanhToan = phuongThucThanhToanService.getPhuongThucThanhToanById(form.getMaPhuongThucThanhToan());
        donHang.setPhuongThucThanhToan(phuongThucThanhToan);

        //Tạo phương thức thanh toán
        DichVuVanChuyen dichVuVanChuyen = dichVuVanChuyenService.getDichVuVanChuyenById(form.getMaDichVuVanChuyen());
        donHang.setDichVuVanChuyen(dichVuVanChuyen);

        //Tạo đơn hàng mới
        donHang = donHangRepository.save(donHang);


        //Tạo các chi tiết đơn hàng đồng thời xóa data trong giỏ hàng
        for(CTDHCreateForm form1: form.getDanhSachSanPham()){
            ctdhService.createCTDH(donHang.getMaDonHang(), form1);
            gioHangService.deleteGioHang(form.getMaKhachHang(), form1.getMaSanPham());
        }


        //Tạo trạng thái đơn hàng
        trangThaiDonHangService.createTrangThaiDonHang(donHang.getMaDonHang());

        return donHang;
    }

    @Override
    public DonHang updateDonHang(Integer maDonHang, DonHangUpdateForm form) {

        TrangThaiDonHangCreateForm trangThaiDonHangCreateForm = new TrangThaiDonHangCreateForm();
        trangThaiDonHangCreateForm.setTrangThai(form.getTrangThai());

        //Tạo trạng thái đơn hàng
        trangThaiDonHangService.createTrangThaiDonHang(maDonHang, trangThaiDonHangCreateForm);


        return getDonHangByMaDonHang(maDonHang);
    }
}