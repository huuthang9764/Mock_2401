package MockProjectBackEnd.Services.SanPhamServices.AnhMinhHoa;


import MockProjectBackEnd.Entity.SanPhamEntities.AnhMinhHoa;

import java.util.List;

public interface IAnhMinhHoaService {

    List<AnhMinhHoa> getAnhMinhHoaByMaSanPham(Integer maSanPham);

    AnhMinhHoa createAnhMinhHoa(Integer maSanPham, String URL);

    void deleteAnhMinhHoa (Integer maSanPham, String publicId);



}
