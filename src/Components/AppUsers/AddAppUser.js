import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import AppUserForm from './AppUserForm'

const AddAppUser = () => {
    return (
        <div><Header title="App User" />
            <MainMenu menu="appusers" />
            <AppUserForm mode="Create" />
        </div>
    )
}
export default AddAppUser;