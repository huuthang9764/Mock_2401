package MockProjectBackEnd.Specification.SanPhamSpecification.SanPham;

import MockProjectBackEnd.Entity.SanPhamEntities.SanPham;
import MockProjectBackEnd.Form.SanPhamForms.SanPham.SanPhamFilterForm;
import com.mysql.cj.util.StringUtils;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;

@Data
public class SanPhamSpecification {
    public static Specification<SanPham>  buildWhere(String search, SanPhamFilterForm form){

        Specification<SanPham> where = null;

        if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
            search = search.trim();
            SanPhamCustomSpecification tenSanPham = new SanPhamCustomSpecification("tenSanPham", search);
            where = Specification.where(tenSanPham);
        }

        if (form != null){
            if (form.getMaLoaiSanPham() != null){
                SanPhamCustomSpecification maLoaiSanPham = new SanPhamCustomSpecification("maLoaiSanPham", form.getMaLoaiSanPham());
                if (where == null){
                    where = Specification.where(maLoaiSanPham);
                }else {
                    where = where.and(maLoaiSanPham);
                }
            }

            if (form.getMaThuongHieu() != null){
                SanPhamCustomSpecification maThuongHieu = new SanPhamCustomSpecification("maThuongHieu", form.getMaThuongHieu());
                if (where == null){
                    where = Specification.where(maThuongHieu);
                }else{
                    where = where.and(maThuongHieu);
                }
            }

            if (form.getTrangThai() != null){
                SanPhamCustomSpecification trangThai = new SanPhamCustomSpecification("trangThai",
                    form.getTrangThai());

                if (where == null){
                    where = Specification.where(trangThai);
                }else{

                    where = where.and(trangThai);
                }
            }
        }

        return  where;

    }

}
