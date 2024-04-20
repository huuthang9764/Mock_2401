package MockProjectBackEnd.Services.TaiKhoanServices.TaiKhoan;

import MockProjectBackEnd.Configuration.ErrorResponse.NotActiveException;
import MockProjectBackEnd.Configuration.ErrorResponse.TheValueAlreadyExists;
import MockProjectBackEnd.Entity.TaiKhoanEntities.RegistrationToken;
import MockProjectBackEnd.Entity.TaiKhoanEntities.TaiKhoan;
import MockProjectBackEnd.Event.OnSendRegistrationUserConfirmViaEmailEvent;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanCreateForm;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanFilterForm;
import MockProjectBackEnd.Form.TaiKhoanForms.TaiKhoan.TaiKhoanUpdateForm;
import MockProjectBackEnd.Repositories.TaiKhoanRepositories.ITaiKhoanRepository;
import MockProjectBackEnd.Services.TaiKhoanServices.NguoiDung.INguoiDungService;
import MockProjectBackEnd.Services.TaiKhoanServices.RegistrationToken.IRegistrationTokenService;
import MockProjectBackEnd.Specification.TaiKhoanSpecification.TaiKhoan.TaiKhoanSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class TaiKhoanService implements ITaiKhoanService {

    @Autowired
    private ITaiKhoanRepository repository;

    @Autowired
    private INguoiDungService nguoiDungService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private IRegistrationTokenService registrationTokenService;



    @Autowired
    /**
     * MÔ TẢ VỀ APPLICATION EVENT PUBLISHER
     *
     */
    private ApplicationEventPublisher eventPublisher;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public Page<TaiKhoan> getAllTaiKhoan(Pageable pageable, String search, TaiKhoanFilterForm form) {

        Specification<TaiKhoan> buildWhere = TaiKhoanSpecification.buildWhere(search, form);

        return repository.findAll(buildWhere, pageable);

    }

    @Override
    public TaiKhoan getTaiKhoanByID(Integer maTaiKhoan) {
        return repository.findById(maTaiKhoan).get();

    }


    @Override
    public TaiKhoan getTaiKhoanByEmail(String email){
        return repository.findByNguoiDung_Email(email);
    }

    @Override
    /**
     * MÔ TẢ VỀ NGHIỆP VỤ KÍCH HOẠT TÀI KHOẢN
     *             1. Tìm đối tượng RegistrationToken dựa tên Token
     *             2. Kiểm tra hạn sử dụng
     *                 2.1 Nếu hợp lệ
     *                - Mở khóa tài khoản
     *                - Xóa token đã dùng
     *                 2.2 Neu không hợp lệ
     *                - Xóa token, tài khoản và người dùng liên quan
     *                - Yêu cầu ng dùng Registates lại
     *
     *
     *     Các mã lỗi
     *     0: Thành công
     *     1. Token hết hn
     *     2. Token không còn tồn tại

     */
    public int activeUser(String token){
        RegistrationToken registrationToken = registrationTokenService.getRegistrationTokenByToken(token);

        if (registrationToken == null){
            return 2;
        }

        TaiKhoan taiKhoan = registrationToken.getTaiKhoan();



        if ( registrationToken.getHanSuDung().isAfter(LocalDateTime.now())){
            taiKhoan.setTrangThai(true);
            repository.save(taiKhoan);
            registrationTokenService.deleteRegistrationToken(registrationToken.getId());
            return 0;
        }else{
            // remove Registration User Token
            registrationTokenService.deleteRegistrationToken(registrationToken.getId());
            deleteByMaTaiKhoan(taiKhoan.getMaTaiKhoan());
            return 1;
            //throw new TokenExpiredException("Token kích hoạt tài khoản của bạn đã hết hạn !! Xin hãy tạo lại tài khoản !!");
        }


    }

    @Override
    @Transactional
    /****
     * MÔ TẢ SERVICE TẠO TÀI KHOẢN
     *      1. Tạo Tài khoản trước (Đã bao gồm mã hóa password)
     *      2. Tạo 1 token có thời hạn 2 tiếng khi tài khoản được tạo ra.
     *      3. Hệ thống sẽ gửi email tới email mà người dùng đã đăng ký. Với nội dung bao gồm Token xác thực
     *
     */


    public TaiKhoan createTaiKhoan(TaiKhoanCreateForm form) throws TheValueAlreadyExists {
        if ( !nguoiDungService.isEmailExists(form.getEmail()) ){
            TaiKhoan taiKhoan = modelMapper.map(form, TaiKhoan.class);

            taiKhoan.setMatKhau( passwordEncoder.encode( form.getMatKhau() ) );

            taiKhoan = repository.save(taiKhoan);

            //Tạo Account
            nguoiDungService.createNguoiDung(taiKhoan.getMaTaiKhoan(), form);

            //Tạo token
            registrationTokenService.createRegistrationToken(taiKhoan);

            /*
            * Mô tả cụ thể:
            *    - ApplicationEventPublisher: Dùng Bean dùng để call Event
            *    - ApplicationEvent: Đại diện cho Event tổng quát
            *    - ApplicationListener: Interface dùng để lắng nghe event
            *
            * Nội dung trong code:
            *           OnSendRegistrationUserConfirmViaEmailEvent extends ApplicationEvent
            *           -> OnSendRegistrationUserConfirmViaEmailEvent là 1 event
            *    Lúc này ta có thể dùng ApplicationEventPublisher để phát tín hiệu Event này trên toàn source
            *    Và để có thể bắt tín hiệu ta dùng
            *           ApplicationListener<OnSendRegistrationUserConfirmViaEmailEvent>
            *     Vì SendRegistrationUserConfirmViaEmailListener
            *        implements ApplicationListener<OnSendRegistrationUserConfirmViaEmailEvent>
            *      -> SendRegistrationUserConfirmViaEmailListener là 1 class có chứa phương thức
            *       onApplicationEvent(OnSendRegistrationUserConfirmViaEmailEvent e)
            *
            *   Tóm lại: Khi OnSendRegistrationUserConfirmViaEmailEvent được call thì phương thức onApplicationEvent trong SendRegistrationUserConfirmViaEmailListener sẽ được thực thi
            *
            *
            */
            eventPublisher.publishEvent(new OnSendRegistrationUserConfirmViaEmailEvent(form.getEmail()));


            return  taiKhoan;
        }else{
            throw new TheValueAlreadyExists("Email '" + form.getEmail() + "' đã tồn tại hãy chọn email khác !!");

        }
    }

    @Override
    @Transactional

    public TaiKhoan updateTaiKhoan(Integer maTaiKhoan, TaiKhoanUpdateForm form) {

            TaiKhoan taiKhoan = repository.findById(maTaiKhoan).get();

            nguoiDungService.updateNguoiDung(maTaiKhoan, form);


            if (form.getQuyen() != null){
                taiKhoan.setQuyen(form.getQuyen());
            }


            if (form.isTrangThai() != null){
                taiKhoan.setTrangThai(form.isTrangThai());
            }


            taiKhoan = repository.save(taiKhoan);

            nguoiDungService.updateNguoiDung(taiKhoan.getMaTaiKhoan(), form);

            return taiKhoan;

    }

    @Override
    @Transactional
    public void deleteByMaTaiKhoan(Integer maTaiKhoan){
        nguoiDungService.deleteNguoiDung(maTaiKhoan);
        repository.deleteById(maTaiKhoan);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        TaiKhoan taiKhoan = getTaiKhoanByEmail(username);

        if (taiKhoan == null) {
            throw new UsernameNotFoundException(username);
        }

        return new org.springframework.security.core.userdetails.User(
            taiKhoan.getNguoiDung().getEmail(),
            taiKhoan.getMatKhau(),
            AuthorityUtils.createAuthorityList(taiKhoan.getQuyen().toString())
        );
    }
}
