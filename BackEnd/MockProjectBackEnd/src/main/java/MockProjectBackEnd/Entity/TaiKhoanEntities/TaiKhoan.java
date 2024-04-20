package MockProjectBackEnd.Entity.TaiKhoanEntities;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "TaiKhoan")
@Data
public class TaiKhoan implements Serializable, UserDetails {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "MaTaiKhoan")
        private Integer maTaiKhoan;

        @Column(name = "MatKhau", nullable = false)
        private String matKhau;

        @Column(name = "TrangThai", nullable = false)
        private Boolean trangThai;

        @Column(name = "NgayTao", nullable = false)
        @Temporal(TemporalType.TIMESTAMP)
        private LocalDateTime ngayTao;

        @Column(name = "Quyen", nullable = false)
        @Enumerated(EnumType.STRING)
        private Quyen quyen;

        @OneToOne(mappedBy = "taiKhoan")
        private NguoiDung nguoiDung;

        @PrePersist
        public void prePersist(){
            if (trangThai == null){
                trangThai = false;
            }

            if (ngayTao == null){
                ngayTao = LocalDateTime.now();
            }
        }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(quyen.name()));
    }

    @Override
    public String getPassword() {
        return this.matKhau;
    }

    @Override
    public String getUsername() {
        return this.getNguoiDung().getEmail();
    }
}
