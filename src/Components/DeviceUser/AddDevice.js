import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import DeviceForm from './DeviceForm';

const AddDevice = () => {
    return (
        <div><Header title="Device" />
            <MainMenu menu="device" />
            <DeviceForm mode="Create" />
        </div>
    )
}
export default AddDevice;