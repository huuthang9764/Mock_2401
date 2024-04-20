package MockProjectBackEnd.Services.SanPhamServices.LoaiSanPham;

import MockProjectBackEnd.Configuration.ErrorResponse.TheValueAlreadyExists;
import MockProjectBackEnd.Entity.SanPhamEntities.LoaiSanPham;
import MockProjectBackEnd.Form.SanPhamForms.LoaiSanPham.LoaiSanPhamCreateAndUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ILoaiSanPhamService {

    Page<LoaiSanPham> getAllLoaiSanPham(Pageable pageable, String search);
    LoaiSanPham getLoaiSanPhamByID(Integer maLoaiSanPham);

    boolean isTenLoaiSanPhamExists(String tenLoaiSanPham);

    LoaiSanPham createLoaiSanPham(LoaiSanPhamCreateAndUpdateForm form) throws TheValueAlreadyExists;
    LoaiSanPham updateLoaiSanPham(Integer maLoaiSanPham, LoaiSanPhamCreateAndUpdateForm form)  throws TheValueAlreadyExists;
    void deleteLoaiSanPham(Integer maLoaiSanPham);
    void  deleteLoaiSanPhams(List<Integer> danhSachMaLoaiSanPham);

}
