import TableUser from "./LoaiSanPham/TableUser.jsx";
import '../../../index.css'
import '../../../App.jsx'
import ContainerCommon from "./../../../components/ContainerCommon/ContainerCommon";

const CategoryManage = () => {
    return (

        //HẢI SỬA Ở ĐÂY

        <div style={{ marginLeft: "", width: "50%" }}>
            <ContainerCommon title={"Quản lý loại sản phẩm"}>
                <div style={{ marginLeft: "200px", width: "100%" }}>
                    <TableUser />
                </div>
            </ContainerCommon>
        </div>
    )
}

export default CategoryManage