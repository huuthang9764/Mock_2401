package MockProjectBackEnd.Services.SanPhamServices.AnhMinhHoa;

import MockProjectBackEnd.Entity.SanPhamEntities.AnhMinhHoa;
import MockProjectBackEnd.Others.CloundinaryServices;
import MockProjectBackEnd.Repositories.SanPhamRepositories.IAnhMinhHoaRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Data
@Service
public class AnhMinhHoaService implements IAnhMinhHoaService{

    @Autowired
    private IAnhMinhHoaRepository repository;

    @Override
    public List<AnhMinhHoa> getAnhMinhHoaByMaSanPham(Integer maSanPham) {
        return repository.findBySanPham_MaSanPham(maSanPham);
    }

    @Override
    @Transactional

    public AnhMinhHoa createAnhMinhHoa(Integer maSanPham, String URL) {

        //Lưu Ảnh lên Cloundinary và lấy về PublicID
        String publicId = CloundinaryServices.createImage(URL);

        //Sau khi lưu lên CLound ta sẽ lưu PublicID vào Database
        AnhMinhHoa anhMinhHoa = new AnhMinhHoa();
        AnhMinhHoa.AnhMinhHoaPK anhMinhHoaPK = new AnhMinhHoa.AnhMinhHoaPK();
        anhMinhHoaPK.setMaSanPham(maSanPham);
        anhMinhHoaPK.setUrl(publicId);
        anhMinhHoa.setId(anhMinhHoaPK);
        return repository.save(anhMinhHoa);
    }

    @Override
    @Transactional
    public void deleteAnhMinhHoa(Integer maSanPham, String publicId) {

        //Xóa Ảnh lên Cloundinary và lấy về PublicID
        CloundinaryServices.deleteImage(publicId);

        //Xóa đường dẫn trong Database
        AnhMinhHoa.AnhMinhHoaPK id = new AnhMinhHoa.AnhMinhHoaPK();
        id.setMaSanPham(maSanPham);
        id.setUrl(publicId);
        repository.deleteById(id);

    }
}
