import MainMenu from '../../MainMenu/MainMenu';
import Header from '../../Header/Header';
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