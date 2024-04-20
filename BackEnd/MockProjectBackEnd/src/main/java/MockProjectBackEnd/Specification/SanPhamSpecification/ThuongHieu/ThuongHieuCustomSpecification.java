package MockProjectBackEnd.Specification.SanPhamSpecification.ThuongHieu;

import MockProjectBackEnd.Entity.SanPhamEntities.LoaiSanPham;
import MockProjectBackEnd.Entity.SanPhamEntities.ThuongHieu;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

@Data
public class ThuongHieuCustomSpecification implements Specification<ThuongHieu>{

        @NonNull
        private String field;

        @NonNull
        private Object value;

        @Override
        public Predicate toPredicate(@NonNull Root<ThuongHieu> root,
                                     @NonNull CriteriaQuery<?> query,
                                     @NonNull CriteriaBuilder criteriaBuilder) {

            if (field.equalsIgnoreCase("tenThuongHieu")){
                return criteriaBuilder.like(root.get("tenThuongHieu") ,"%" + value  + "%");
            }

            return null;
        }



}
