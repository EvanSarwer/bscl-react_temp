import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import DeviceUserForm from './DeviceUserForm';

const AddDeviceUser = () => {
    return (
        <div><Header title="Device User" />
            <MainMenu menu="deviceusers" />
            <DeviceUserForm mode="Create" />
        </div>
    )
}
export default AddDeviceUser;