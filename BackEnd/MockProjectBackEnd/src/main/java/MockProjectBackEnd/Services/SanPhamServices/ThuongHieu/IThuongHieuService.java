package MockProjectBackEnd.Services.SanPhamServices.ThuongHieu;

import MockProjectBackEnd.Configuration.ErrorResponse.TheValueAlreadyExists;
import MockProjectBackEnd.Entity.SanPhamEntities.LoaiSanPham;
import MockProjectBackEnd.Entity.SanPhamEntities.ThuongHieu;
import MockProjectBackEnd.Form.SanPhamForms.LoaiSanPham.LoaiSanPhamCreateAndUpdateForm;
import MockProjectBackEnd.Form.SanPhamForms.ThuongHieu.ThuongHieuCreateAndUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IThuongHieuService {
    Page<ThuongHieu> getAllThuongHieu(Pageable pageable, String search);
    ThuongHieu getThuongHieuByID(Integer maThuongHieu);

    boolean isTenThuongHieuExists(String tenThuongHieu);

    ThuongHieu createThuongHieu(ThuongHieuCreateAndUpdateForm form) throws TheValueAlreadyExists;
    ThuongHieu updateThuongHieu(Integer maThuongHieu, ThuongHieuCreateAndUpdateForm form)  throws TheValueAlreadyExists;
    void deleteThuongHieu(Integer maThuongHieu);
    void  deleteThuongHieus(List<Integer> danhSachMaThuongHieu);
}
