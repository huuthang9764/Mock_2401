package MockProjectBackEnd.Entity.MuaHangEntities;

public enum TrangThai {
    ChoDuyet,
    DaDuyet,
    Huy,
    DangGiao ,
    GiaoThanhCong;

    public static TrangThai convertFromString(String value) {
        switch (value) {
            case "DangGiao":
                return TrangThai.DangGiao;
            case "ChoDuyet":
                return TrangThai.ChoDuyet;
            case "DaDuyet":
                return TrangThai.DaDuyet;
            case "Huy":
                return TrangThai.Huy;
            case "GiaoThanhCong":
                return TrangThai.GiaoThanhCong;
            default:
                throw new IllegalArgumentException("Không tồn tại trạng thái: " + value);
        }
    }
}
