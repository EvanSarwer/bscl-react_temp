
import { useParams } from "react-router-dom";
import MainMenuDeployer from "../../MainMenu/MainMenuDeployer";
import Header from "../../Header/Header";
import DeviceForm from "./DeviceForm";

const EditDevice = () => {
    const { id } = useParams();
    return (
        <div><Header title="Device" />
            <MainMenuDeployer menu="device" />
            <DeviceForm mode="Edit" id={id} />
        </div>
    )
}
export default EditDevice;