package MockProjectBackEnd.Services.TaiKhoanServices.TaiKhoan;

import MockProjectBackEnd.Configuration.ErrorResponse.TheValueAlreadyExists;
import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanCreateForm;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanFilterForm;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface ITaiKhoanService extends UserDetailsService {

    int activeUser(String token);

    Page<TaiKhoan> getAllTaiKhoan(Pageable pageable, String search, TaiKhoanFilterForm form);

    TaiKhoan getTaiKhoanByID(Integer maTaiKhoan);

    TaiKhoan getTaiKhoanByEmail(String email);

    TaiKhoan createTaiKhoan(TaiKhoanCreateForm form) throws TheValueAlreadyExists;

    TaiKhoan updateTaiKhoan(Integer maTaiKhoan, TaiKhoanUpdateForm form) throws TheValueAlreadyExists;

    void deleteByMaTaiKhoan(Integer maTaiKhoan);
}
