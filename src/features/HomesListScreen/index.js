import { thunkGetHomesList } from "app/homeSlice";
import BaseLayout from "general/components/BaseLayout";
import BootstrapTable from "react-bootstrap/Table";
import BaseSearchBar from "general/components/Form/BaseSearchBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";

HomesListScreen.propTypes = {};

function HomesListScreen(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { homesList } = useSelector((state) => state?.home);
    const [selectedHome, setSelectedHome] = useState({});
    const [showModalEditHome, setShowModalEditHome] = useState(false);
    const [showModalDeleteHome, setShowModalDeleteHome] = useState(false);

    const [filters, setFilters] = useState({
        q: "",
    });

    useEffect(() => {
        dispatch(thunkGetHomesList(filters));
    }, [filters]);
    return (
        <div>
            <BaseLayout selected="homes">
                <div className="HomesListScreen flex-column-fluid">
                    <div className="container-xxl">
                        <div className="card card-flush mb-9">
                            <div className="card-header">
                                <div className="d-flex justify-content-between">
                                    <div className="font-weight-bolder font-size-h3 text-remaining">
                                        Danh sách nhà
                                    </div>
                                    <div>
                                        <BaseSearchBar
                                            placeholder="Tìm kiếm nhà"
                                            className=""
                                            value={filters.q}
                                            name="homeFilter"
                                            onSubmit={(value) => {
                                                setFilters({
                                                    ...filters,
                                                    q: value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                {homesList?.length > 0 ? (
                                    <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                        Tổng cộng: {homesList?.length} nhà
                                    </div>
                                ) : (
                                    <div className="font-weight-bolder text-black-50 font-size-lg text-remaining">
                                        Danh sách trống
                                    </div>
                                )}
                            </div>
                            <div className="card-body p-0">
                                {homesList?.length > 0 && (
                                    <BootstrapTable striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên nhà</th>
                                                <th>Địa chỉ</th>
                                                <th>Số phòng</th>
                                                <th>Thực hiện</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {homesList?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        {item.address}
                                                    </td>
                                                    <td>
                                                        {item.roomsList?.length}
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center mb-2">
                                                            <a
                                                                className="btn btn-icon btn-sm btn-light-primary btn-hover-primary mr-2"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    setSelectedHome(
                                                                        item
                                                                    );
                                                                    setShowModalEditHome(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <i className="far fa-pen p-0 icon-1x" />
                                                            </a>
                                                            <a
                                                                className="btn btn-icon btn-sm btn-light-danger btn-hover-danger"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    setSelectedHome(
                                                                        item
                                                                    );
                                                                    setShowModalDeleteHome(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <i className="far fa-trash p-0 icon-1x" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </BootstrapTable>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </BaseLayout>
        </div>
    );
}

export default HomesListScreen;
