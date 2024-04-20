package MockProjectBackEnd.Specification.TaiKhoanSpecification.TaiKhoan;

import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.Data;
import lombok.NonNull;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;

@Data
public class TaiKhoanCustomSpecification implements Specification<TaiKhoan> {

    @NonNull
    private String field;

    @NonNull
    private Object value;

    @Override
    public Predicate toPredicate(@NonNull Root<TaiKhoan> root,
                                 @NonNull CriteriaQuery<?> query,
                                 @NonNull CriteriaBuilder criteriaBuilder) {

        if (field.equalsIgnoreCase("email")){
            return criteriaBuilder.like(root.get("nguoiDung").get("email"), "%" + value + "%");
        }

        if (field.equalsIgnoreCase("trangThai")){
            return criteriaBuilder.equal(root.get("trangThai"), value);
        }

        if (field.equalsIgnoreCase("quyen")){
            return criteriaBuilder.equal(root.get("quyen"), value);
        }

        if (field.equalsIgnoreCase("minDate")){
            return criteriaBuilder.greaterThanOrEqualTo(root.get("ngayTao").as(java.sql.Date.class) , (Date) value);
        }

        if (field.equalsIgnoreCase("maxDate")){
            return criteriaBuilder.lessThanOrEqualTo(root.get("ngayTao").as(java.sql.Date.class) , (Date) value);
        }


        return null;
    }
}
