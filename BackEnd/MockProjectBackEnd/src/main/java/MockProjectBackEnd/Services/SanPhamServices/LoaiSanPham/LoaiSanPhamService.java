package MockProjectBackEnd.Services.SanPhamServices.LoaiSanPham;

import MockProjectBackEnd.Configuration.ErrorResponse.TheValueAlreadyExists;
import MockProjectBackEnd.Entity.SanPhamEntities.LoaiSanPham;
import MockProjectBackEnd.Entity.SanPhamEntities.SanPham;
import MockProjectBackEnd.Form.SanPhamForms.LoaiSanPham.LoaiSanPhamCreateAndUpdateForm;
import MockProjectBackEnd.Services.SanPhamServices.SanPham.ISanPhamService;
import MockProjectBackEnd.Specification.SanPhamSpecification.LoaiSanPham.LoaiSanPhamSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import MockProjectBackEnd.Repositories.SanPhamRepositories.ILoaiSanPhamRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class LoaiSanPhamService implements ILoaiSanPhamService {
    @Autowired
    ILoaiSanPhamRepository iLoaiSanPhamRepository;

    @Autowired
    @Lazy // Dùng @Lazy để giải quyết vòng lặp dependencies vô tận
    ISanPhamService sanPhamService;

    @Autowired
    ModelMapper modelMapper;


    @Override
    public Page<LoaiSanPham> getAllLoaiSanPham(Pageable pageable, String search) {
        Specification<LoaiSanPham> buildWhere = LoaiSanPhamSpecification.buildWhere(search);
        return iLoaiSanPhamRepository.findAll( buildWhere, pageable);
    }

    @Override
    public LoaiSanPham getLoaiSanPhamByID(Integer maLoaiSanPham) {
        return iLoaiSanPhamRepository.findById(maLoaiSanPham).get();
    }

    @Override
    public boolean isTenLoaiSanPhamExists(String tenLoaiSanPham) {
        return iLoaiSanPhamRepository.existsByTenLoaiSanPham(tenLoaiSanPham);
    }


    @Override
    @Transactional
    public LoaiSanPham createLoaiSanPham(LoaiSanPhamCreateAndUpdateForm form) throws TheValueAlreadyExists{
        if (!isTenLoaiSanPhamExists(form.getTenLoaiSanPham())){
            LoaiSanPham loaiSanPham = modelMapper.map(form, LoaiSanPham.class);
            return iLoaiSanPhamRepository.save(loaiSanPham);
        }else {
            throw new TheValueAlreadyExists("Giá trị '" + form.getTenLoaiSanPham() + "' đã tồn tại hãy kiểm tên khác phù hợp !!");
        }

    }

    @Override
    @Transactional
    public LoaiSanPham updateLoaiSanPham(Integer maLoaiSanPham, LoaiSanPhamCreateAndUpdateForm form) throws TheValueAlreadyExists {
        if (!isTenLoaiSanPhamExists(form.getTenLoaiSanPham())){
            LoaiSanPham updatedLoaiSanPham = modelMapper.map(form, LoaiSanPham.class);
            updatedLoaiSanPham.setMaLoaiSanPham(maLoaiSanPham);
            return iLoaiSanPhamRepository.save(updatedLoaiSanPham);
        }else {
            throw new TheValueAlreadyExists("Giá trị '" + form.getTenLoaiSanPham() + "' đã tồn tại hãy kiểm tên khác phù hợp !!");
        }
    }

    @Override
    @Transactional
    public void deleteLoaiSanPham(Integer maLoaiSanPham) {

        List<SanPham> dsSanPham = sanPhamService.getAllSanPhamByMaLoaiSanPham(maLoaiSanPham);
        LoaiSanPham loaiSanPhamMacDinh = iLoaiSanPhamRepository.findById(1).get();

        for(SanPham sp: dsSanPham){
            sp.setLoaiSanPham(loaiSanPhamMacDinh);
            sanPhamService.updateSanPham(sp);
        }


        iLoaiSanPhamRepository.deleteById(maLoaiSanPham);
    }

    @Override
    @Transactional
    public void deleteLoaiSanPhams(List<Integer> danhSachMaLoaiSanPham) {

        for (Integer maLoaiSanPham: danhSachMaLoaiSanPham ) {
            List<SanPham> dsSanPham = sanPhamService.getAllSanPhamByMaLoaiSanPham(maLoaiSanPham);
            LoaiSanPham loaiSanPhamMacDinh = iLoaiSanPhamRepository.findById(1).get();

            for(SanPham sp: dsSanPham){
                sp.setLoaiSanPham(loaiSanPhamMacDinh);
                sanPhamService.updateSanPham(sp);
            }
        }

        iLoaiSanPhamRepository.deleteAllById(danhSachMaLoaiSanPham);
    }
}
