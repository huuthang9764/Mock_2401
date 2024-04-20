package MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan;

import MockProjectBackEnd.Entity.TaiKhoanEntities.Quyen;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Data
public class TaiKhoanFilterForm {

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date from;

    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date to;

    private Quyen quyen;

    private Boolean trangThai;


}
