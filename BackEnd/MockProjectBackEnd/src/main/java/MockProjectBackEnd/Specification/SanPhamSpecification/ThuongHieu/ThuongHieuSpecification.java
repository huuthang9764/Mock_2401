package MockProjectBackEnd.Specification.SanPhamSpecification.ThuongHieu;

import MockProjectBackEnd.Entity.SanPhamEntities.LoaiSanPham;
import MockProjectBackEnd.Entity.SanPhamEntities.ThuongHieu;
import MockProjectBackEnd.Specification.SanPhamSpecification.LoaiSanPham.LoaiSanPhamCustomSpecification;
import com.mysql.cj.util.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class ThuongHieuSpecification {
        public static Specification<ThuongHieu> buildWhere(String search){
            Specification<ThuongHieu> where = null;

            if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
                search = search.trim();
                ThuongHieuCustomSpecification tenThuongHieu = new ThuongHieuCustomSpecification("tenThuongHieu", search);
                where = Specification.where(tenThuongHieu);
            }

            return where;

        }

}
