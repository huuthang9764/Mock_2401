package MockProjectBackEnd.Specification.SanPhamSpecification.SanPham;

import MockProjectBackEnd.Entity.SanPhamEntities.SanPham;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;
@Data
public class SanPhamCustomSpecification implements Specification<SanPham> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(@NonNull Root<SanPham> root,
                                 @NonNull CriteriaQuery<?> query,
                                 @NonNull CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("tenSanPham")){
            return criteriaBuilder.like(root.get("tenSanPham"), "%" + value + "%");
        }

        if (field.equalsIgnoreCase("maLoaiSanPham")){
            return criteriaBuilder.equal(root.get("loaiSanPham").get("maLoaiSanPham"), value);
        }

        if (field.equalsIgnoreCase("maThuongHieu")){
            return criteriaBuilder.equal(root.get("thuongHieu").get("maThuongHieu"), value);
        }

        if (field.equalsIgnoreCase("trangThai")){
            return criteriaBuilder.equal(root.get("trangThai"), value);
        }

        return null;
    }
}
