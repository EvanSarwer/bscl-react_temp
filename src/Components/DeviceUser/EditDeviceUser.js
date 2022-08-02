
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";
import DeviceUserForm from "./DeviceUserForm";
const EditDeviceUser = () => {
    const { id } = useParams();
    return (
        <div><Header title="Device User" />
            <MainMenu menu="deviceusers" />
            <DeviceUserForm mode="Edit" id={id} />
        </div>
    )
}
export default EditDeviceUser;