package MockProjectBackEnd.Services.MuaHangServices.ChiTietDonHang;

import MockProjectBackEnd.Entity.MuaHangEntities.CTDH;
import MockProjectBackEnd.Form.MuaHangForms.ChiTietDonHang.CTDHCreateForm;
import MockProjectBackEnd.Repositories.MuaHangRepositories.ICTDHRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CTDHService implements ICTDHService{
    @Autowired
    private ICTDHRepository ctdhRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<CTDH> getAllCTDHByMaDonHang(Integer maDonHang) {
        return ctdhRepository.findAllByDonHang_MaDonHang(maDonHang);
    }

    @Override
    public CTDH createCTDH(CTDH ctdh) {
        return ctdhRepository.save(ctdh);
    }

    @Override
    public CTDH createCTDH(Integer maDonHang, CTDHCreateForm form) {
        CTDH ctdh = modelMapper.map(form, CTDH.class);

        CTDH.CTDHPK id = new CTDH.CTDHPK();
        id.setMaDonHang(maDonHang);
        id.setMaSanPham(form.getMaSanPham());
        ctdh.setId(id);

        return ctdhRepository.save(ctdh);
    }
}