package MockProjectBackEnd.Specification.TaiKhoanSpecification.TaiKhoan;

import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanFilterForm;
import com.mysql.cj.util.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class TaiKhoanSpecification {

    public static Specification<TaiKhoan> buildWhere(String search, TaiKhoanFilterForm form){

        Specification<TaiKhoan> where = null;

        if (!StringUtils.isEmptyOrWhitespaceOnly(search)) {
            search = search.trim();
            TaiKhoanCustomSpecification email = new TaiKhoanCustomSpecification("email", search);
            where = Specification.where(email);
        }

        if (form != null){

            if (form.getTrangThai() != null){

                Specification<TaiKhoan> trangThai = new TaiKhoanCustomSpecification("trangThai", form.getTrangThai());

                if (where == null){
                    where = Specification.where(trangThai);
                }else{
                    where = where.and(trangThai);
                }
            }

            if (form.getQuyen() != null) {
                Specification<TaiKhoan> quyen = new TaiKhoanCustomSpecification("quyen", form.getQuyen());

                if (where == null){
                    where = Specification.where(quyen);
                }else{
                    where = where.and(quyen);
                }
            }


            if (form.getFrom() != null) {
                Specification<TaiKhoan> minDate = new TaiKhoanCustomSpecification("minDate", form.getFrom());

                if (where == null){
                    where = Specification.where(minDate);
                }else{
                    where = where.and(minDate);
                }
            }

            if (form.getTo() != null) {
                Specification<TaiKhoan> maxDate = new TaiKhoanCustomSpecification("maxDate", form.getTo());

                if (where == null){
                    where = Specification.where(maxDate);
                }else{
                    where = where.and(maxDate);
                }
            }

        }

        return where;

    }

}
