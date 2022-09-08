import { useParams } from "react-router-dom";
import Header from "../../Header/Header";
import MainMenu from "../../MainMenu/MainMenu";
import UserForm from "./UserForm";

const AddUser = () => {
    const { device_id, user_index } = useParams();
    return (
        <div><Header title="Device User" />
            <MainMenu menu="device" />
            <UserForm mode="Create" device_id={device_id} user_index={user_index} />
        </div>
    )
}
export default AddUser;