import MainMenuDeployer from '../../MainMenu/MainMenuDeployer';
import Header from '../../Header/Header';
import DeviceForm from './DeviceForm';

const AddDevice = () => {
    return (
        <div><Header title="Device" />
            <MainMenuDeployer menu="device" />
            <DeviceForm mode="Create" />
        </div>
    )
}
export default AddDevice;