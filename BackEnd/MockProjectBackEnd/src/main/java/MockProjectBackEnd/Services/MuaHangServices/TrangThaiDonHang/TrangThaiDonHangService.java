package MockProjectBackEnd.Services.MuaHangServices.TrangThaiDonHang;

import MockProjectBackEnd.Entity.MuaHangEntities.CTDH;
import MockProjectBackEnd.Entity.MuaHangEntities.TrangThai;
import MockProjectBackEnd.Entity.MuaHangEntities.TrangThaiDonHang;
import MockProjectBackEnd.Entity.SanPhamEntities.SanPham;
import MockProjectBackEnd.Form.MuaHangForms.TrangThaiDonHang.TrangThaiDonHangCreateForm;
import MockProjectBackEnd.Repositories.MuaHangRepositories.ITrangThaiDonHangRepository;
import MockProjectBackEnd.Services.MuaHangServices.ChiTietDonHang.ICTDHService;
import MockProjectBackEnd.Services.SanPhamServices.SanPham.ISanPhamService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TrangThaiDonHangService implements  ITrangThaiDonHangService{

    @Autowired
    private ITrangThaiDonHangRepository trangThaiDonHangRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Autowired
    private ICTDHService ictdhServices;

    @Autowired
    private ISanPhamService sanPhamServices;



    @Override
    public List<TrangThaiDonHang> getAllTrangThaiDonHang(Integer maDonHang) {
        return trangThaiDonHangRepository.findAllTrangThaiDonHangByDonHang_MaDonHang(maDonHang);
    }

    @Override
    public TrangThaiDonHang trangThaiDonHangMoiNhat(Integer maDonHang) {
        return trangThaiDonHangRepository.findFirstByDonHangMaDonHangOrderByNgayCapNhatDesc(maDonHang).orElse(null);
    }


    //Phương thức create Trạng thái nhanh cho các đơn hàng chờ duyệt
    @Override
    @Transactional
    public void createTrangThaiDonHang(Integer maDonHang) {
        TrangThaiDonHang trangThaiDonHang = new TrangThaiDonHang();
        TrangThaiDonHang.TrangThaiDonHangPK id = new TrangThaiDonHang.TrangThaiDonHangPK();
        id.setMaDonHang(maDonHang);
        id.setTrangThai(TrangThai.ChoDuyet);
        trangThaiDonHang.setId(id);

        trangThaiDonHang.setNgayCapNhat(LocalDateTime.now());
        trangThaiDonHangRepository.save(trangThaiDonHang);
    }





    @Override
    @Transactional
        public void createTrangThaiDonHang(Integer maDonHang, TrangThaiDonHangCreateForm form) {
        TrangThaiDonHang trangThaiDonHang = modelMapper.map(form, TrangThaiDonHang.class);
        TrangThaiDonHang.TrangThaiDonHangPK pk = new TrangThaiDonHang.TrangThaiDonHangPK();

        pk.setMaDonHang(maDonHang);
        pk.setTrangThai(form.getTrangThai());
        trangThaiDonHang.setId(pk);
        trangThaiDonHang.setNgayCapNhat(LocalDateTime.now());


        /**
         *  Có 2 tình huống có thể xảy ra
         *  1. Khởi tạo trạng thái lần đầu
         *      + Kiếm thử xem đơn hàng này đã có trạng thái gì trước đó chưa ?
         *      + Nếu chưa thì khởi tạo và bỏ qua phần kiểm trạng thái bên dưới và khởi tạo trạng thái mới.
         *      + Nếu đã có thì tới trường hợp thứ 2.
         *
         *  2. Chuyển trạng thái.
         *      + Nếu đơn hàng từ ChoDuyet thành DaDuyet -> Giảm số lượng toàn bộ Sản Phẩm có trong đơn hàng
         *      + Nếu đơn hàng từ ChoDuyet thành Huy -> Không làm gì cả
         *      + Nếu đơn hàng từ DaDuyet thành Huy -> Check để refund lại số lượng đã mua
         */

        //Kiểm tra xem đã tồn tai trạng thái đơn hàng cu chưa ?
        TrangThaiDonHang trangThaiDonHangCu = trangThaiDonHangMoiNhat(maDonHang);

        if ( trangThaiDonHangCu != null) {
            //Duyệt sẽ giảm số lượng
            if (form.getTrangThai().equals(TrangThai.DaDuyet)) {
                List<CTDH> chiTietDonHang = ictdhServices.getAllCTDHByMaDonHang(maDonHang);
                for (CTDH ctdh : chiTietDonHang) {
                    SanPham sanPham = sanPhamServices.getSanPhamByID(ctdh.getSanPham().getMaSanPham());
                    sanPham.setSoLuongConLai(sanPham.getSoLuongConLai() - ctdh.getSoLuong());
                }
            }

            //Refund lại số lượng khi hủy 1 đơn hàng đã được duyệt
//            else if (form.getTrangThai().equals(TrangThai.Huy) &&
//                        ( trangThaiDonHangCu.getId().getTrangThai().equals(TrangThai.DaDuyet) ||
//                            trangThaiDonHangCu.getId().getTrangThai().equals(TrangThai.DangGiao) )
//                    ) {

            else if (form.getTrangThai().equals(TrangThai.Huy) && trangThaiDonHangCu.getId().getTrangThai().equals(TrangThai.DaDuyet)) {
                List<CTDH> chiTietDonHang = ictdhServices.getAllCTDHByMaDonHang(maDonHang);
                for (CTDH ctdh : chiTietDonHang) {
                    SanPham sanPham = sanPhamServices.getSanPhamByID(ctdh.getSanPham().getMaSanPham());
                    sanPham.setSoLuongConLai(sanPham.getSoLuongConLai() + ctdh.getSoLuong());
                }
            }
        }

        trangThaiDonHangRepository.save(trangThaiDonHang);
    }


}
