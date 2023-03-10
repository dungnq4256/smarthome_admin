import { thunkChangePassword, thunkSignOut } from "app/authSlice";
import { LogoDark, ShowSideBar, ShowSideBarActive } from "assets/icons/Icons";
import { useFormik } from "formik";
import ToastHelper from "general/helpers/ToastHelper";
import UserHelper from "general/helpers/UserHelper";
import Utils from "general/utils/Utils";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import DialogModal from "../DialogModal";
import BaseTextField from "../Form/BaseTextField";
import "./style.scss";

HeaderLandingPage.propTypes = {
    loggedIn: PropTypes.bool,
    showSideBarMobile: PropTypes.bool,
};

HeaderLandingPage.defaultProps = {
    loggedIn: false,
    showSideBarMobile: false,
};

function HeaderLandingPage(props) {
    const { showSideBarMobile } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isChangingPassword, currentAccount } = useSelector(
        (state) => state?.auth
    );
    let [showLogOutModal, setShowLogOutModal] = useState(false);
    let [showSideBar, setShowSideBar] = useState(showSideBarMobile);
    const [showChangePasswordModal, setShowChangePasswordModal] =
        useState(false);
    const sendData = () => {
        props.parentCallback(showSideBar);
    };
    const handleShowSideBar = () => {
        setShowSideBar(!showSideBar);
        sendData();
    };
    function handleNavigate(url) {
        navigate(url);
    }

    const formik = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
        onSubmit: async (values, { resetForm }) => {
            const params = { ...values };
            let inputPassword = params.password;
            params.password = Utils.sha256(inputPassword);
            delete params?.confirmPassword;
            let hashPassword = Utils.sha256(params.newPassword);
            params.newPassword = hashPassword;
            // console.log(` on submit: ${JSON.stringify(params)}`);
            try {
                const res = await dispatch(thunkChangePassword(params));
                // console.log(res);
                if (res.payload.result === "failed") {
                    ToastHelper.showError(`${res.payload.message}`);
                } else {
                    setShowChangePasswordModal(false);
                    resetForm({ values: "" });
                }
            } catch (error) {
                console.log(` error: ${error.message}`);
            }
        },
        validationSchema: Yup.object({
            password: Yup.string().trim().required("B???n ch??a nh???p m???t kh???u"),
            newPassword: Yup.string()
                .required("B???n ch??a nh???p m???t kh???u")
                .min(6, "M???t kh???u ph???i ch???a ??t nh???t 6 k?? t???")
                .matches(/^\S*$/, "M???t kh???u kh??ng ???????c ch???a kho???ng tr???ng"),
            confirmPassword: Yup.string()
                .required("B???n ch??a x??c nh???n m???t kh???u")
                .oneOf([Yup.ref("newPassword"), null], "M???t kh???u kh??ng kh???p"),
        }),
    });

    return (
        <div
            className="HeaderLandingPage d-flex align-items-center sticky-top shadow-sm px-5 py-3 ps-5 bg-body"
            style={{ height: "60px" }}
        >
            <div
                className="btnShowSideBar d-flex d-lg-none ms-1 me-3"
                onClick={handleShowSideBar}
            >
                {!showSideBar && <ShowSideBar />}
                {showSideBar && <ShowSideBarActive />}
            </div>
            <NavLink to="/home" className="d-flex d-lg-none align-items-center">
                <LogoDark />
            </NavLink>
            <div className="d-none d-md-flex fw-bold fs-4 flex-fill justify-content-center mx-5">
                TRANG QU???N TR??? H??? TH???NG
            </div>
            
            <div className="d-flex">
                <div
                    className="mx-4 my-2"
                    style={{ borderLeft: "2px solid #b5b5c3" }}
                ></div>
                <input type="checkbox" id="dropdownMenu-loggedIn" />
                <label
                    className="m-0"
                    htmlFor="dropdownMenu-loggedIn"
                    id="overlay-button"
                >
                    <img
                        src={
                            currentAccount?.avatar ||
                            UserHelper.getRandomAvatarUrl()
                        }
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = UserHelper.getRandomAvatarUrl();
                        }}
                        style={{
                            height: "40px",
                            width: "40px",
                            objectFit: "cover",
                            marginRight: "1rem",
                            borderRadius: "5px",
                        }}
                        alt="???nh ?????i di???n"
                    />
                    <i className="fas fa-sort-down me-2"></i>
                </label>
                <div id="overlay">
                    <ul className="d-flex flex-column justify-content-center align-items-center ps-0 m-0 text-start">
                        <li>
                            <div className="d-flex align-items-center ms-2 py-4">
                                <img
                                    src={
                                        currentAccount?.avatar ||
                                        UserHelper.getRandomAvatarUrl()
                                    }
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                            UserHelper.getRandomAvatarUrl();
                                    }}
                                    style={{
                                        height: "50px",
                                        width: "50px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                    alt="avatar"
                                />
                                <div className="d-flex flex-column ms-3">
                                    <div className="fs-6 fw-bold pt-2">
                                        {currentAccount?.fullname}
                                    </div>
                                    <div className="fs-6 pt-1">
                                        {currentAccount?.email}
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <NavLink className="dropdownMenuItem" to="/account">
                                <i className="far fa-user-circle mr-4"></i>
                                Th??ng tin qu???n tr??? vi??n
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="dropdownMenuItem"
                                onClick={() => setShowChangePasswordModal(true)}
                            >
                                <i className="far fa-unlock-alt mr-4"></i>
                                ?????i m???t kh???u
                            </NavLink>
                        </li>
                        <li className="border-bottom-0">
                            <div
                                className="dropdownMenuItem"
                                onClick={() => setShowLogOutModal(true)}
                            >
                                <i className="far fa-sign-out mr-4"></i>
                                ????ng xu???t
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <DialogModal
                show={showLogOutModal}
                onClose={() => setShowLogOutModal(false)}
                icon="fad fa-user text-info"
                title="????ng xu???t"
                description="B???n c?? ch???c ch???n mu???n ????ng xu???t?"
                onExecute={async () => {
                    await dispatch(thunkSignOut()).then(() => {
                        UserHelper.signOut();
                    });
                    navigate("/sign-in");
                }}
            />
            <DialogModal
                show={showChangePasswordModal}
                onClose={() => setShowChangePasswordModal(false)}
                icon="fad fa-user-lock text-info"
                title="?????i m???t kh???u"
                close={false}
                onExecute={formik.handleSubmit}
            >
                <form className="w-100" onSubmit={formik.handleSubmit}>
                    <div>
                        <div>
                            <BaseTextField
                                require={true}
                                type="password"
                                name="password"
                                placeholder="Nh???p m???t kh???u c??..."
                                label="M???t kh???u c??"
                                fieldHelper={formik.getFieldHelpers("password")}
                                fieldProps={formik.getFieldProps("password")}
                                fieldMeta={formik.getFieldMeta("password")}
                            />
                        </div>
                        <div>
                            <BaseTextField
                                require={true}
                                type="password"
                                name="newPassword"
                                placeholder="Nh???p m???t kh???u m???i..."
                                label="M???t kh???u m???i"
                                fieldHelper={formik.getFieldHelpers(
                                    "newPassword"
                                )}
                                fieldProps={formik.getFieldProps("newPassword")}
                                fieldMeta={formik.getFieldMeta("newPassword")}
                            />
                        </div>
                        <div>
                            <BaseTextField
                                require={true}
                                type="password"
                                name="confirmPassword"
                                placeholder="Nh???p l???i m???t kh???u m???i..."
                                label="Nh???p l???i m???t kh???u m???i"
                                fieldHelper={formik.getFieldHelpers(
                                    "confirmPassword"
                                )}
                                fieldProps={formik.getFieldProps(
                                    "confirmPassword"
                                )}
                                fieldMeta={formik.getFieldMeta(
                                    "confirmPassword"
                                )}
                            />
                        </div>
                    </div>
                    {isChangingPassword && (
                        <div className="d-flex align-items-center justify-content-center m-4">
                            <div>
                                <span>Vui l??ng ?????i trong ??t ph??t...</span>
                                <span className="spinner spinner-loader spinner-primary"></span>
                            </div>
                        </div>
                    )}
                </form>
            </DialogModal>
            
        </div>
    );
}

export default HeaderLandingPage;
