package MockProjectBackEnd.Services.SanPhamServices.SanPham;

import MockProjectBackEnd.Configuration.ErrorResponse.TheValueAlreadyExists;
import MockProjectBackEnd.Entity.SanPhamEntities.LoaiSanPham;
import MockProjectBackEnd.Entity.SanPhamEntities.SanPham;
import MockProjectBackEnd.Entity.SanPhamEntities.ThuongHieu;
import MockProjectBackEnd.Form.SanPhamForms.AnhMinhHoa.AnhMinhHoaCreateUpdateDeleteForm;
import MockProjectBackEnd.Form.SanPhamForms.SanPham.SanPhamCreateForm;
import MockProjectBackEnd.Form.SanPhamForms.SanPham.SanPhamFilterForm;
import MockProjectBackEnd.Form.SanPhamForms.SanPham.SanPhamUpdateForm;
import MockProjectBackEnd.Repositories.SanPhamRepositories.ILoaiSanPhamRepository;
import MockProjectBackEnd.Repositories.SanPhamRepositories.IThuongHieuRepository;
import MockProjectBackEnd.Services.SanPhamServices.AnhMinhHoa.IAnhMinhHoaService;
import MockProjectBackEnd.Services.SanPhamServices.LoaiSanPham.ILoaiSanPhamService;
import MockProjectBackEnd.Services.SanPhamServices.ThuongHieu.IThuongHieuService;
import MockProjectBackEnd.Specification.SanPhamSpecification.SanPham.SanPhamSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import MockProjectBackEnd.Repositories.SanPhamRepositories.ISanPhamRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class SanPhamService implements ISanPhamService {
    @Autowired
    private ISanPhamRepository sanPhamRepository;

    @Autowired
    private IAnhMinhHoaService anhMinhHoaService;

    @Autowired
    private ILoaiSanPhamService loaiSanPhamService;

    @Autowired
    private IThuongHieuService thuongHieuService;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public Page<SanPham> getAllSanPham(Pageable pageable, String search, SanPhamFilterForm form) {

        Specification<SanPham> buildWhere = SanPhamSpecification.buildWhere(search, form);
        return sanPhamRepository.findAll(buildWhere, pageable);
    }

    @Override
    public List<SanPham> getAllSanPhamByMaLoaiSanPham(Integer maLoaiSanPham) {
        return sanPhamRepository.findByLoaiSanPham_MaLoaiSanPham(maLoaiSanPham);
    }

    @Override
    public List<SanPham> getAllSanPhamByMaThuongHieu(Integer maThuongHieu) {
        return sanPhamRepository.findByThuongHieu_MaThuongHieu(maThuongHieu);

    }


    @Override
    public SanPham getSanPhamByID(Integer maSanPham) {
        return sanPhamRepository.findById(maSanPham).get();
    }

    @Override
    public boolean isTenSanPhamExists(String tenSanPham) {
        return sanPhamRepository.existsByTenSanPham(tenSanPham);
    }


//    @Override
//    @Transactional
//    public SanPham createSanPham(SanPham sanPham){
//        return sanPhamRepository.save(sanPham);
//    }

    @Override
    @Transactional
    public SanPham createSanPham(SanPhamCreateForm form) throws TheValueAlreadyExists {

        //Kiểm tra xem tên sản phẩm đã tồn tại hay chưa
        if ( !isTenSanPhamExists(form.getTenSanPham()) ){

//            // Lấy ra TypeMap SanPhamCreateForm -> SanPham
//            TypeMap<SanPhamCreateForm, SanPham> typeMap = modelMapper.typeMap(SanPhamCreateForm.class, SanPham.class);
//
//
//            // Nếu Type map đã có tồn tại rồi thôi nếu chưa ta sẽ custom
//            if (typeMap == null){
//
//                // Tạo 1 ảnh xạ từ SanPhamCreateForm -> SanPham
//                modelMapper.addMappings(new PropertyMap<SanPhamCreateForm, SanPham>() {
//                    @Override
//                    protected void configure(){
//
//                        //Bỏ qua trường ID tại SanPham
//                        skip(destination.getMaSanPham());
//                    }
//                });
//            }
//
//            //Chuyển từ Form sang SanPham
//            SanPham sanPham = modelMapper.map(form, SanPham.class);

            SanPham sanPham = new SanPham();
            sanPham.setTenSanPham(form.getTenSanPham());
            sanPham.setGia(form.getGia());
            sanPham.setSoLuot(form.getSoLuot());
            sanPham.setXuatXu(form.getXuatXu());
            sanPham.setMoTaChiTiet(form.getMoTaChiTiet());

            sanPham.setLoaiSanPham(loaiSanPhamService.getLoaiSanPhamByID(form.getMaLoaiSanPham()));
            sanPham.setThuongHieu(thuongHieuService.getThuongHieuByID(form.getMaThuongHieu()));

            sanPham = sanPhamRepository.save(sanPham);

            // Lưu các ảnh của Sản phẩm vào Database
            for (AnhMinhHoaCreateUpdateDeleteForm anhMinhHoaCreateUpdateDeleteForm : form.getDanhSachAnhMinhHoa()) {

                anhMinhHoaService.createAnhMinhHoa(sanPham.getMaSanPham(), anhMinhHoaCreateUpdateDeleteForm.getUrl());

            }
            return sanPham;

        }else{
            throw new TheValueAlreadyExists("Tên sản phẩm: '" + form.getTenSanPham() + "' đã tồn tại hãy chọn tên khác !!");
        }
    }

    @Override
    @Transactional
    public SanPham updateSanPham(SanPham sanPham) {
        return sanPhamRepository.save(sanPham);
    }

    @Override
    @Transactional
    public SanPham updateSanPham(Integer maSanPham, SanPhamUpdateForm form) throws TheValueAlreadyExists {
        //Kiểm tra xem tên sản phẩm đã tồn tại hay chưa
        if ( !isTenSanPhamExists( form.getTenSanPham()) ){


            SanPham sanPham = sanPhamRepository.findById(maSanPham).get();

            //Kiểm tra xem FE muốn update trường nào
            if (form.getTenSanPham() != null) {
                sanPham.setTenSanPham(form.getTenSanPham());
            }

            if (form.getGia() != null) {
                sanPham.setGia(form.getGia());
            }

            if (form.getSoLuot() != null) {
                sanPham.setSoLuot(form.getSoLuot());
            }

            if (form.getXuatXu() != null) {
                sanPham.setXuatXu(form.getXuatXu());
            }

            if (form.getMoTaChiTiet() != null) {
                sanPham.setMoTaChiTiet(form.getMoTaChiTiet());
            }

            if (form.getMaLoaiSanPham() != null) {
                LoaiSanPham loaiSanPham = loaiSanPhamService.getLoaiSanPhamByID(form.getMaLoaiSanPham());
                sanPham.setLoaiSanPham(loaiSanPham);
            }

            if (form.getMaThuongHieu() != null) {
                ThuongHieu thuongHieu = thuongHieuService.getThuongHieuByID(form.getMaThuongHieu());
                sanPham.setThuongHieu(thuongHieu);
            }

            if (form.getTrangThai() != null){
                sanPham.setTrangThai(form.getTrangThai());
            }

            sanPham = sanPhamRepository.save(sanPham);

            if ( form.getDanhSachAnhCanXoa() != null){
                //Xóa ảnh cũ (Những ảnh bị thay đổi)
                for (AnhMinhHoaCreateUpdateDeleteForm a: form.getDanhSachAnhCanXoa() ) {
                    anhMinhHoaService.deleteAnhMinhHoa(maSanPham, a.getUrl());
                }
            }

            if (form.getDanhSachAnhCanThemMoi() != null){
                //Thêm ảnh mới
                for (AnhMinhHoaCreateUpdateDeleteForm a: form.getDanhSachAnhCanThemMoi() ) {
                    anhMinhHoaService.createAnhMinhHoa(maSanPham, a.getUrl());
                }
            }



            return sanPham;
        }else{
            throw new TheValueAlreadyExists("Tên sản phẩm: '" + form.getTenSanPham() + "' đã tồn tại hãy chọn tên khác !!");
        }
    }


}
