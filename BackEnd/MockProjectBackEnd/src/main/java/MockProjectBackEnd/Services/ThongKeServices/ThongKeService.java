package MockProjectBackEnd.Services.ThongKeServices;

import MockProjectBackEnd.DTO.ThongKeDTOs.DonHang.ThongKeDonHangChiTietDTO;
import MockProjectBackEnd.DTO.ThongKeDTOs.DonHang.ThongKeDonHangDTO;
import MockProjectBackEnd.DTO.ThongKeDTOs.ThongKeTongQuatDTO;
import MockProjectBackEnd.Entity.MuaHangEntities.TrangThai;
import MockProjectBackEnd.Form.MuaHangForms.DonHang.DonHangFillerForm;
import MockProjectBackEnd.Services.MuaHangServices.DonHang.IDonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class ThongKeService implements  IThongKeService{

    @Autowired
    private IDonHangService donHangService;

    @Override
    public ThongKeTongQuatDTO thongKeTongQuat(){
        ThongKeTongQuatDTO thongKeTongQuatDTO = new ThongKeTongQuatDTO();

        // Xử lý thống kê đơn hàng
        thongKeTongQuatDTO.setSoDonHangThangNay(donHangService.getDonHangInCurrentMonth());
        thongKeTongQuatDTO.setSoDonHangThangTruoc(donHangService.getDonHangInPreviousMonth());

        // Xử lý thông kê đơn hàng giao thành cong
        thongKeTongQuatDTO.setSoDonHangGiaoThanhCongThangNay(donHangService.getDonHangInCurrentMonthAccoundingToStatus(TrangThai.GiaoThanhCong));
        thongKeTongQuatDTO.setSoDonHangGiaoThanhCongThangTruoc(donHangService.getDonHangInPreviousMonthAccoundingToStatus(TrangThai.GiaoThanhCong));

        //Xử lý doanh thu theo ngày
        Integer profitToday = donHangService.getProfitToday();
        Integer profitPreviousDay = donHangService.getProfitPreviousDay();

        if (profitToday != null) {
            thongKeTongQuatDTO.setDoanhThuHomNay(profitToday);
        } else {
            thongKeTongQuatDTO.setDoanhThuHomNay(0);
        }

        if (profitPreviousDay != null) {
            thongKeTongQuatDTO.setDoanhThuHomQua(profitPreviousDay);
        } else {
            thongKeTongQuatDTO.setDoanhThuHomQua(0);
        }



        //Xu lý doanh thu theo tháng

        Integer profitCurrentMonth = donHangService.getProfitByMonth();
        Integer profitPreviousMonth = donHangService.getProfitByPreviousMonth();

        if (profitCurrentMonth != null) {
            thongKeTongQuatDTO.setDoanhThuThangNay(profitCurrentMonth);
        } else {
            thongKeTongQuatDTO.setDoanhThuThangNay(0);
        }

        if (profitPreviousMonth != null) {
            thongKeTongQuatDTO.setDoanhThuThangTruoc(profitPreviousMonth);
        } else {
            thongKeTongQuatDTO.setDoanhThuThangTruoc(0);
        }

        return thongKeTongQuatDTO;
    }

    @Override
    public List<ThongKeDonHangDTO> thongKeDonHang(DonHangFillerForm form) {
            /*****
             * resultSQL: Là bảng kết quả trả về từ SQL. Các phần tử là các Object[]
             *          Object[0]: Ngày tháng năm (java.sql.Date)
             *          Object[1]: Trạng thái (String)
             *          Object[2]: Số lượng (Long)
             *
             */


            List<Object[]> resultSQL =  donHangService.thongKeDonHang(form);

            List<ThongKeDonHangDTO> result = new ArrayList<>();


            Set<LocalDate> setDate = new LinkedHashSet<>();


            /*****
             *  Ý tưởng: #THug24
             *      1. Lấy tất cả các ngày có trong Table được trả ra thêm vào 1 tập hợp set
             *          -> Lúc này lợi dụng tính chất của Set nó sẽ tự loại bỏ những ngày trùng nhau
             *      2. Lúc này những ngày trong set sẽ là độc nhất vì thế lúc này ta bắt đầu tạo list ThongKeDonHangDTO
             *      3. Sau đó duyet lại Table trả ra và so sánh với ngày với từng phần tử trong  list ThongKeDonHangDTO
             *          -> Cái nào phù hợp thì nhét vào
             *
             *
             */


            // 1. Set sẽ gom lại các giá trị ngày duy nhất
            for (Object[] i : resultSQL) {
                // java.sql.Date -> java.time.LocalDate, nhưng chúng không thể được chuyển đổi trực tiếp với nhau vì vậy phải chuyển gián tiếp.
                java.sql.Date sqlDate = (java.sql.Date) i[0];
                setDate.add(sqlDate.toLocalDate());
            }


            // 2. Tạo trước ThongKeDonHangDTO để thêm giá trị vào
            for (LocalDate i : setDate) {
                ThongKeDonHangDTO dto = new ThongKeDonHangDTO();
                dto.setNgayDatDon(i);
                dto.setDanhSachTrangThaiVaSoLuong(new ArrayList<>());
                result.add(dto);
            }

            //Lúc này sẽ bắt đầu gom lại
            origin:
            for (Object[] i : resultSQL) {
                for (ThongKeDonHangDTO dto : result) {
                    java.sql.Date sqlDate = (java.sql.Date) i[0];
                    if (dto.getNgayDatDon().equals(sqlDate.toLocalDate())) {

                        ThongKeDonHangChiTietDTO chiTiet = new ThongKeDonHangChiTietDTO();

                        TrangThai trangThai = TrangThai.convertFromString(i[1].toString());
                        chiTiet.setTrangThai(trangThai);

                        chiTiet.setSoLuong(Integer.parseInt(i[2].toString()));

                        dto.getDanhSachTrangThaiVaSoLuong().add(chiTiet);
                        continue origin;
                    }
                }
            }

            return result;

        }


}
