package MockProjectBackEnd.Services.SanPhamServices.ThuongHieu;

import MockProjectBackEnd.Configuration.ErrorResponse.TheValueAlreadyExists;
import MockProjectBackEnd.Entity.SanPhamEntities.LoaiSanPham;
import MockProjectBackEnd.Entity.SanPhamEntities.SanPham;
import MockProjectBackEnd.Entity.SanPhamEntities.ThuongHieu;
import MockProjectBackEnd.Form.SanPhamForms.ThuongHieu.ThuongHieuCreateAndUpdateForm;
import MockProjectBackEnd.Repositories.SanPhamRepositories.IThuongHieuRepository;
import MockProjectBackEnd.Services.SanPhamServices.SanPham.ISanPhamService;
import MockProjectBackEnd.Specification.SanPhamSpecification.LoaiSanPham.LoaiSanPhamSpecification;
import MockProjectBackEnd.Specification.SanPhamSpecification.ThuongHieu.ThuongHieuSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ThuongHieuService implements IThuongHieuService{
    @Autowired
    IThuongHieuRepository repository;

    @Autowired
    @Lazy // Dùng @Lazy để giải quyết vòng lặp dependencies vô tận
    ISanPhamService sanPhamService;

    @Autowired
    ModelMapper modelMapper;


    @Override
    public Page<ThuongHieu> getAllThuongHieu(Pageable pageable, String search) {
        Specification<ThuongHieu> buidlWhere = ThuongHieuSpecification.buildWhere(search);
        return repository.findAll( buidlWhere, pageable);
    }

    @Override
    public ThuongHieu getThuongHieuByID(Integer maThuongHieu) {
        return repository.findById(maThuongHieu).get();
    }

    @Override
    public boolean isTenThuongHieuExists(String tenThuongHieu) {
        return repository.existsByTenThuongHieu(tenThuongHieu);
    }

    @Override
    @Transactional

    public ThuongHieu createThuongHieu(ThuongHieuCreateAndUpdateForm form) throws TheValueAlreadyExists {
        if (!isTenThuongHieuExists(form.getTenThuongHieu())){
            ThuongHieu thuongHieu = modelMapper.map(form, ThuongHieu.class);
            return repository.save(thuongHieu);
        }else {
            throw new TheValueAlreadyExists("Giá trị '" + form.getTenThuongHieu() + "' đã tồn tại hãy kiểm tên khác phù hợp !!");
        }
    }

    @Override
    @Transactional

    public ThuongHieu updateThuongHieu(Integer maThuongHieu, ThuongHieuCreateAndUpdateForm form) throws TheValueAlreadyExists {
        if (!isTenThuongHieuExists(form.getTenThuongHieu())){
            ThuongHieu updatedThuongHieu = modelMapper.map(form, ThuongHieu.class);
            updatedThuongHieu.setMaThuongHieu(maThuongHieu);
            return repository.save(updatedThuongHieu);
        }else {
            throw new TheValueAlreadyExists("Giá trị '" + form.getTenThuongHieu() + "' đã tồn tại hãy kiểm tên khác phù hợp !!");
        }
    }

    @Override
    @Transactional

    public void deleteThuongHieu(Integer maThuongHieu) {

        List<SanPham> dsSanPham = sanPhamService.getAllSanPhamByMaThuongHieu(maThuongHieu);
        ThuongHieu thuongHieuMacDinh = repository.findById(1).get();

        for(SanPham sp: dsSanPham){
            sp.setThuongHieu(thuongHieuMacDinh);
            sanPhamService.updateSanPham(sp);
        }
        repository.deleteById(maThuongHieu);
    }

    @Override
    @Transactional
    public void deleteThuongHieus(List<Integer> danhSachMaThuongHieu) {

        for (Integer maThuongHieu: danhSachMaThuongHieu ) {
            List<SanPham> dsSanPham = sanPhamService.getAllSanPhamByMaThuongHieu(maThuongHieu);
            ThuongHieu thuongHieuMacDinh = repository.findById(1).get();

            for(SanPham sp: dsSanPham){
                sp.setThuongHieu(thuongHieuMacDinh);
                sanPhamService.updateSanPham(sp);
            }
        }


        repository.deleteAllById(danhSachMaThuongHieu);
    }
}
