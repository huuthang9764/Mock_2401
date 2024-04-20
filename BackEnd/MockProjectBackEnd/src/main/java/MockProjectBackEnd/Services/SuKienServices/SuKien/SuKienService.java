package MockProjectBackEnd.Services.SuKienServices.SuKien;

import MockProjectBackEnd.Entity.SuKienEntities.SuKien;
import MockProjectBackEnd.Form.SuKienForms.SuKien.SuKienCreateForm;
import MockProjectBackEnd.Form.SuKienForms.SuKien.SuKienUpdateForm;
import MockProjectBackEnd.Repositories.SuKienRepositories.ISuKienRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SuKienService implements ISuKienService{

    @Autowired
    private ISuKienRepository suKienRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Page<SuKien> getAllSuKien(Pageable pageable) {
        return suKienRepository.findAll(pageable);
    }

    @Override
    public SuKien getSuKienByID(Integer maSuKien) {
        return suKienRepository.findById(maSuKien).orElse(null);
    }

    @Override
    @Transactional
    public void createSuKien(SuKienCreateForm form) {
        SuKien suKien = modelMapper.map(form, SuKien.class);
        suKienRepository.save(suKien);
    }

    @Override
    @Transactional
    public void updateSuKien(Integer maSuKien, SuKienUpdateForm form) {

        SuKien suKien = modelMapper.map(form, SuKien.class);
        suKien.setMaSuKien(maSuKien);
        suKienRepository.save(suKien);
    }

    @Override
    @Transactional
    public void deleteSuKien(Integer maSukien) {
        suKienRepository.deleteById(maSukien);
    }

    @Override
    @Transactional
    public void deleteNhieuSuKien(List<Integer> danhSachSuKien) {
        suKienRepository.deleteAllById(danhSachSuKien);
    }
}
