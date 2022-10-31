
import { useParams } from "react-router-dom";
import MainMenu from "../../MainMenu/MainMenu";
import Header from "../../Header/Header";
import DeviceForm from "./DeviceForm";

const EditDevice = () => {
    const { id } = useParams();
    return (
        <div><Header title="Device" />
            <MainMenu menu="device" />
            <DeviceForm mode="Edit" id={id} />
        </div>
    )
}
export default EditDevice;