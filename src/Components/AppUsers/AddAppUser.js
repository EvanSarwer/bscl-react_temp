import Header from '../Header/Header';
import AppUserForm from './AppUserForm'

const AddAppUser = () => {
    return (
        <div><Header title="App User" />
            <AppUserForm mode="Create" />
        </div>
    )
}
export default AddAppUser;