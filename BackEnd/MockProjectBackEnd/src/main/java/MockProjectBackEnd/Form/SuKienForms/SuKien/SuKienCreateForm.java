package MockProjectBackEnd.Form.SuKienForms.SuKien;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

@Data
public class SuKienCreateForm {

    @NotBlank(message = "Bạn không được để trống tên sự kiện !!")
    private String tenSuKien;

    @NotNull(message = "Bạn không được để trống ngày bắt đầu !!")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @FutureOrPresent(message = "Ngày bắt đầu phải là một ngày trong tương lai hoặc hiện tại !!")
    private LocalDate ngayBatDau;

    @NotNull(message = "Bạn không được để trống ngày kết thúc !!")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @FutureOrPresent(message = "Ngày kết thúc phải là một ngày trong tương lai hoặc hiện tại!!")
    private LocalDate ngayKetThuc;
}
