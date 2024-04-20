package MockProjectBackEnd.Repositories.SanPhamRepositories;

import MockProjectBackEnd.Entity.SanPhamEntities.AnhMinhHoa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IAnhMinhHoaRepository extends JpaRepository<AnhMinhHoa, AnhMinhHoa.AnhMinhHoaPK>{
    List<AnhMinhHoa> findBySanPham_MaSanPham(Integer maSanPham);
}
