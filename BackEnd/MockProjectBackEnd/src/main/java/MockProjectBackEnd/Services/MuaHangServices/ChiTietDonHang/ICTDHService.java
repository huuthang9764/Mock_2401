package MockProjectBackEnd.Services.MuaHangServices.ChiTietDonHang;


import MockProjectBackEnd.Entity.MuaHangEntities.CTDH;
import MockProjectBackEnd.Form.MuaHangForms.ChiTietDonHang.CTDHCreateForm;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ICTDHService {

    List<CTDH> getAllCTDHByMaDonHang(Integer maDonHang);

    CTDH createCTDH(CTDH ctdh);

    CTDH createCTDH(Integer maDonHang, CTDHCreateForm form);

//
//    CTDH updateCTDH(CTDH ctdh);
//
//    void deleteCTDH(Long maDonHang, Long maSanPham);
}
