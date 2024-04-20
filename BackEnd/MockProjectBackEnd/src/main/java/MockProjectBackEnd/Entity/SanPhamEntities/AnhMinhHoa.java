package MockProjectBackEnd.Entity.SanPhamEntities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@Table(name = "AnhMinhHoa")
@Data
public class AnhMinhHoa implements Serializable{


    @EmbeddedId
    private AnhMinhHoaPK id;

    @ManyToOne
    @MapsId("MaSanPham") //Chỉ ra rằng đây là khóa ngoại của khóa chnh
    @JoinColumn(name = "MaSanPham", referencedColumnName = "MaSanPham")
    private SanPham sanPham;


    @Embeddable
    @Data
    @NoArgsConstructor
    public static class AnhMinhHoaPK implements Serializable {

        @Column(name = "MaSanPham", nullable = false)
        private Integer maSanPham;

        @Column(name = "URL", nullable = false)
        private String url;

    }
}

