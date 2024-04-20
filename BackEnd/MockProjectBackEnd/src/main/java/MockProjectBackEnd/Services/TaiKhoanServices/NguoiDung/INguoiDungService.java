package MockProjectBackEnd.Services.TaiKhoanServices.NguoiDung;

import MockProjectBackEnd.Entity.TaiKhoanEntities.NguoiDung;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanCreateForm;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanUpdateForm;

public interface INguoiDungService {

    NguoiDung getNguoiDungByMaNguoiDung(Integer maNguoiDung);

    NguoiDung createNguoiDung(Integer maTaiKhoan, TaiKhoanCreateForm form);

    boolean isEmailExists(String email) ;

    NguoiDung updateNguoiDung(Integer maTaiKhoan, TaiKhoanUpdateForm form);

    void deleteNguoiDung(Integer maNguoiDung);




}
