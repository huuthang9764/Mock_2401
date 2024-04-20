package MockProjectBackEnd.Repositories.MuaHangRepositories;

import MockProjectBackEnd.Entity.MuaHangEntities.DonHang;
import MockProjectBackEnd.Entity.MuaHangEntities.TrangThai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IDonHangRepository  extends JpaRepository<DonHang, Integer>, JpaSpecificationExecutor<DonHang> {

    List<DonHang> findAllByMaKhachHang_MaTaiKhoan(Integer maTaiKhoan);

    @Query(
        value = "SELECT COUNT(*) FROM DonHang dh " +
            "WHERE  YEAR(dh.NgayDat) = YEAR(CURRENT_DATE()) AND " +
            "\tMONTH(dh.NgayDat) = MONTH(CURRENT_DATE())", nativeQuery = true
    )
    Integer soDonHangTrongThang();

    /*
    * DATE_ADD
    *   + Tham số đầu tiên: Là 1 giá trị thời gian
    *   + Tham số thu 2: Là khoản thời gian ta muốn + thêm
    * -> Giải thích trong phương thức: Lấy ngày hiện tại bằng CURRENT_DATE() + (-1)
    *   -> Xử lý được vấn đề Tháng 1 lùi về 1 tháng
    *    ( 02/01/2024 -> 02/12/2023)
    *
     */
    @Query(
        value = "SELECT COUNT(*) FROM DonHang dh " +
            "WHERE  YEAR(dh.NgayDat) = YEAR(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH)) AND " +
            "\tMONTH(dh.NgayDat) = MONTH(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH))", nativeQuery = true
    )
    Integer soDonHangThangTruoc();


    @Query(
        value =
            "SELECT COUNT(*) FROM `DonHang` dh JOIN `TrangThaiDonHang` tt ON dh.`MaDonHang` = tt.`MaDonHang`\n" +
            "WHERE YEAR(dh.NgayDat) = YEAR(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH)) AND\n" +
            "\t\tMONTH(dh.NgayDat) = MONTH(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH)) AND\n" +
            "        tt.`NgayCapNhat` = (\n" +
            "\t\t\tSELECT MAX(`NgayCapNhat`) FROM `TrangThaiDonHang` subtt \n" +
            "            WHERE dh.`MaDonHang` = subtt.`MaDonHang`\n" +
            "        )\n" +
            "AND tt.`TrangThai` = :trangThaiDonHang", nativeQuery = true
    )
    Integer soDonHangThangTruocTheoTrangThai(@Param(value = "trangThaiDonHang") String trangThai);

    @Query(
        value =
            "SELECT COUNT(*) FROM `DonHang` dh JOIN `TrangThaiDonHang` tt ON dh.`MaDonHang` = tt.`MaDonHang`\n" +
                "WHERE YEAR(dh.`NgayDat`) = YEAR(CURRENT_DATE()) AND\n" +
                "\t\tMONTH(dh.`NgayDat`) = MONTH(CURRENT_DATE()) AND\n" +
                "        tt.`NgayCapNhat` = (\n" +
                "\t\t\tSELECT MAX(`NgayCapNhat`) FROM `TrangThaiDonHang` subtt \n" +
                "            WHERE dh.`MaDonHang` = subtt.`MaDonHang`\n" +
                "        )\n" +
                "AND tt.`TrangThai` = :trangThaiDonHang", nativeQuery = true
    )
    Integer soDonHangTrongThangTheoTrangThai(@Param(value = "trangThaiDonHang") String trangThai);


    @Query(
        value = "SELECT SUM(dh.TongGiaTri) FROM DonHang dh JOIN TrangThaiDonHang tt ON dh.MaDonHang = tt.MaDonHang " +
            "WHERE YEAR(dh.NgayDat) = YEAR(CURRENT_DATE()) AND " +
            "MONTH(dh.NgayDat) = MONTH(CURRENT_DATE()) AND " +
            "tt.NgayCapNhat = (SELECT MAX(subtt.NgayCapNhat) FROM TrangThaiDonHang subtt WHERE dh.MaDonHang = subtt.MaDonHang) " +
            "AND tt.TrangThai = 'GiaoThanhCong'", nativeQuery = true
    )
    Integer doanhThuThangNay();

    @Query(
        value = "SELECT SUM(dh.TongGiaTri) FROM DonHang dh JOIN TrangThaiDonHang tt ON dh.MaDonHang = tt.MaDonHang " +
            "WHERE YEAR(dh.NgayDat) = YEAR(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH)) AND " +
            "MONTH(dh.NgayDat) = MONTH(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH)) AND " +
            "tt.NgayCapNhat = (SELECT MAX(subtt.NgayCapNhat) FROM TrangThaiDonHang subtt WHERE dh.MaDonHang = subtt.MaDonHang) " +
            "AND tt.TrangThai = 'GiaoThanhCong'", nativeQuery = true
    )
    Integer doanhThuThangTruoc();

    @Query(value = "SELECT SUM(dh.`TongGiaTri`) FROM `DonHang` dh JOIN `TrangThaiDonHang` tt ON dh.`MaDonHang` = tt.`MaDonHang`\n" +
        "WHERE YEAR(dh.`NgayDat`) = YEAR(NOW()) AND\n" +
        "\t\tMONTH(dh.`NgayDat`) = MONTH(NOW()) AND\n" +
        "        DAY(dh.`NgayDat`) = DAY(NOW()) AND\n" +
        "        tt.`NgayCapNhat` = (\n" +
        "\t\t\tSELECT MAX(`NgayCapNhat`) FROM `TrangThaiDonHang` subtt \n" +
        "            WHERE dh.`MaDonHang` = subtt.`MaDonHang`\n" +
        "        )\n" +
        "AND tt.`TrangThai` = \"GiaoThanhCong\"", nativeQuery = true)
    Integer doanhThuHomNay();

    @Query(value = "SELECT SUM(dh.`TongGiaTri`) FROM `DonHang` dh JOIN `TrangThaiDonHang` tt ON dh.`MaDonHang` = tt.`MaDonHang`\n" +
        "WHERE YEAR(dh.NgayDat) = YEAR(DATE_ADD(NOW(), INTERVAL -1 DAY)) AND\n" +
        "\t\tMONTH(dh.NgayDat) = MONTH(DATE_ADD(NOW(), INTERVAL -1 DAY)) AND\n" +
        "        \t\tDAY(dh.NgayDat) = DAY(DATE_ADD(NOW(), INTERVAL -1 DAY)) AND\n" +
        "\n" +
        "        tt.`NgayCapNhat` = (\n" +
        "\t\t\tSELECT MAX(`NgayCapNhat`) FROM `TrangThaiDonHang` subtt \n" +
        "            WHERE dh.`MaDonHang` = subtt.`MaDonHang`\n" +
        "        )\n" +
        "AND tt.`TrangThai` = \"GiaoThanhCong\"", nativeQuery = true)
    Integer doanhThuHomQua();


    /*******************
     *  Ý tưởng:
     *  1. Tìm đơn hàng trong range Date đầu vào
     *  2. JOIN với `TrangThaiDonHang` nhưng chỉ lấy trạng thái mới nhất đưa vào
     *  3. Group by theo ngayCapNhat, TrangThai
     *  4. Đếm số lượng đơn hàng theo từng ngày, từng trạng thái.
     *******************/
    @Query(value = "SELECT DATE(dh.NgayDat) AS ngayLapDon, tdh.TrangThai AS trangThai, COUNT(*) AS soLuongDon " +
        "FROM TrangThaiDonHang tdh " +
        "INNER JOIN DonHang dh ON tdh.MaDonHang = dh.MaDonHang " +
        "WHERE DATE(dh.NgayDat) BETWEEN COALESCE(:minDate, '2010-01-01') AND COALESCE(:maxDate, CURRENT_DATE() ) " +
        "AND tdh.NgayCapNhat = ( " +
        "SELECT MAX(tdh2.NgayCapNhat) " +
        "FROM TrangThaiDonHang tdh2 " +
        "WHERE tdh2.MaDonHang = tdh.MaDonHang " +
        ") " +
        "GROUP BY DATE(dh.NgayDat), tdh.TrangThai " +
        "ORDER BY DATE(dh.NgayDat)", nativeQuery = true)
    List<Object[]> thongKeDonHangTheoNgayVaTrangThai(
        @Param("minDate") String minDate,
        @Param("maxDate") String maxDate);


//    @Query(value = "SELECT DATE(dh.NgayDat) AS ngayLapDon, SUM(dh.TongGiaTri) AS doanhThu " +
//            "FROM DonHang dh " +
//            "INNER JOIN TrangThaiDonHang tdh ON tdh.MaDonHang = dh.MaDonHang " +
//            "WHERE DATE(dh.NgayDat) BETWEEN COALESCE(:minDate, '2010-01-01') AND COALESCE(:maxDate, CURRENT_DATE()) " +
//            "AND tdh.TrangThai = 'Giao Thành Công' " +
//            "AND tdh.NgayCapNhat = ( " +
//            "SELECT MAX(tdh2.NgayCapNhat) " +
//            "FROM TrangThaiDonHang tdh2 " +
//            "WHERE tdh2.MaDonHang = tdh.MaDonHang " +
//            ") " +
//            "GROUP BY DATE(dh.NgayDat) " +
//            "ORDER BY DATE(dh.NgayDat)", nativeQuery = true)
//    List<Object[]> thongKeDoanhThuTheoNgay(
//            @Param("minDate") String minDate,
//            @Param("maxDate") String maxDate);


}
