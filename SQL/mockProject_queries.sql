USE `MockProject_Database`;

-- Tìm số đơn hàng trong tháng này
SELECT COUNT(*) FROM `DonHang` dh
WHERE  YEAR(dh.`NgayDat`) = YEAR(CURRENT_DATE()) AND
		MONTH(dh.`NgayDat`) = MONTH(CURRENT_DATE());
        
-- Tìm số đơn hàng trong ngày hôm qua
SELECT COUNT(*) FROM `DonHang` dh
WHERE YEAR(dh.NgayDat) = YEAR(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH)) AND
		MONTH(dh.NgayDat) = MONTH(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH));
        
        
-- Tìm số đơn hàng trong tháng theo trạng thái trong tháng trước
SELECT * FROM `DonHang` dh JOIN `TrangThaiDonHang` tt ON dh.`MaDonHang` = tt.`MaDonHang`
WHERE YEAR(dh.`NgayDat`) = YEAR(CURRENT_DATE()) AND
		MONTH(dh.`NgayDat`) = MONTH(CURRENT_DATE()) AND
        tt.`NgayCapNhat` = (
			SELECT MAX(`NgayCapNhat`) FROM `TrangThaiDonHang` subtt 
            WHERE dh.`MaDonHang` = subtt.`MaDonHang`
        )
AND tt.`TrangThai` = "GiaoHangThanhCong";
        
        
-- Tìm số đơn hàng trong tháng theo trạng thái trong tháng trước
SELECT * FROM `DonHang` dh JOIN `TrangThaiDonHang` tt ON dh.`MaDonHang` = tt.`MaDonHang`
WHERE YEAR(dh.NgayDat) = YEAR(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH)) AND
		MONTH(dh.NgayDat) = MONTH(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH)) AND
        tt.`NgayCapNhat` = (
			SELECT MAX(`NgayCapNhat`) FROM `TrangThaiDonHang` subtt 
            WHERE dh.`MaDonHang` = subtt.`MaDonHang`
        )
AND tt.`TrangThai` = "GiaoThanhCong";

-- Doanh thu tháng này
SELECT SUM(dh.`TongGiaTri`) FROM `DonHang` dh JOIN `TrangThaiDonHang` tt ON dh.`MaDonHang` = tt.`MaDonHang`
WHERE YEAR(dh.`NgayDat`) = YEAR(CURRENT_DATE()) AND
		MONTH(dh.`NgayDat`) = MONTH(CURRENT_DATE()) AND
        tt.`NgayCapNhat` = (
			SELECT MAX(`NgayCapNhat`) FROM `TrangThaiDonHang` subtt 
            WHERE dh.`MaDonHang` = subtt.`MaDonHang`
        )
AND tt.`TrangThai` = "GiaoThanhCong";
        
        
-- Doanh thu tháng trước
SELECT SUM(dh.`TongGiaTri`) FROM `DonHang` dh JOIN `TrangThaiDonHang` tt ON dh.`MaDonHang` = tt.`MaDonHang`
WHERE YEAR(dh.NgayDat) = YEAR(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH)) AND
		MONTH(dh.NgayDat) = MONTH(DATE_ADD(CURRENT_DATE(), INTERVAL -1 MONTH)) AND
        tt.`NgayCapNhat` = (
			SELECT MAX(`NgayCapNhat`) FROM `TrangThaiDonHang` subtt 
            WHERE dh.`MaDonHang` = subtt.`MaDonHang`
        )
AND tt.`TrangThai` = "GiaoThanhCong";

SELECT * FROM DonHang;
-- Doanh thu hôm nay
SELECT SUM(dh.`TongGiaTri`) FROM `DonHang` dh JOIN `TrangThaiDonHang` tt ON dh.`MaDonHang` = tt.`MaDonHang`
WHERE YEAR(dh.`NgayDat`) = YEAR(NOW()) AND
		MONTH(dh.`NgayDat`) = MONTH(NOW()) AND
        DAY(dh.`NgayDat`) = DAY(NOW()) AND
        tt.`NgayCapNhat` = (
			SELECT MAX(`NgayCapNhat`) FROM `TrangThaiDonHang` subtt 
            WHERE dh.`MaDonHang` = subtt.`MaDonHang`
        )
AND tt.`TrangThai` = "GiaoThanhCong";

        
        
-- Doanh thu hôm qua
SELECT SUM(dh.`TongGiaTri`) FROM `DonHang` dh JOIN `TrangThaiDonHang` tt ON dh.`MaDonHang` = tt.`MaDonHang`
WHERE YEAR(dh.NgayDat) = YEAR(DATE_ADD(NOW(), INTERVAL -1 DAY)) AND
		MONTH(dh.NgayDat) = MONTH(DATE_ADD(NOW(), INTERVAL -1 DAY)) AND
        		DAY(dh.NgayDat) = DAY(DATE_ADD(NOW(), INTERVAL -1 DAY)) AND

        tt.`NgayCapNhat` = (
			SELECT MAX(`NgayCapNhat`) FROM `TrangThaiDonHang` subtt 
            WHERE dh.`MaDonHang` = subtt.`MaDonHang`
        )
AND tt.`TrangThai` = "GiaoThanhCong";

        