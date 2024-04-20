package MockProjectBackEnd.Services.SuKienServices.SuKien;

import MockProjectBackEnd.Entity.SuKienEntities.SuKien;
import MockProjectBackEnd.Form.SuKienForms.SuKien.SuKienCreateForm;
import MockProjectBackEnd.Form.SuKienForms.SuKien.SuKienUpdateForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ISuKienService {

    Page<SuKien> getAllSuKien(Pageable pageable);

    SuKien getSuKienByID(Integer maSuKien);

    void createSuKien(SuKienCreateForm form);

    void updateSuKien(Integer maSuKien, SuKienUpdateForm form);

    void deleteSuKien(Integer maSukien);

    void deleteNhieuSuKien(List<Integer> danhSachSuKien);

}
