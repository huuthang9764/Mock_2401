package MockProjectBackEnd.Services.SanPhamServices.SanPham;

import MockProjectBackEnd.Configuration.ErrorResponse.TheValueAlreadyExists;
import MockProjectBackEnd.Entity.SanPhamEntities.SanPham;
import MockProjectBackEnd.Entity.SanPhamEntities.SanPham;
import MockProjectBackEnd.Form.SanPhamForms.SanPham.SanPhamCreateForm;
import MockProjectBackEnd.Form.SanPhamForms.SanPham.SanPhamFilterForm;
import MockProjectBackEnd.Form.SanPhamForms.SanPham.SanPhamUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ISanPhamService {

    Page<SanPham> getAllSanPham(Pageable pageable, String search,  SanPhamFilterForm form );

    List<SanPham> getAllSanPhamByMaLoaiSanPham(Integer maLoaiSanPham);

    List<SanPham> getAllSanPhamByMaThuongHieu(Integer maThuongHieu);


    SanPham getSanPhamByID(Integer maSanPham);

    boolean isTenSanPhamExists(String tenSanPham);

//    SanPham createSanPham(SanPham sanPham);

    SanPham createSanPham(SanPhamCreateForm form) throws TheValueAlreadyExists;

    SanPham updateSanPham(SanPham sanPham);


    SanPham updateSanPham(Integer maSanPham, SanPhamUpdateForm form)  throws TheValueAlreadyExists;


}
