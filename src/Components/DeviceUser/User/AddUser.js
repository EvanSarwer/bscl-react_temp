import { useParams } from "react-router-dom";
import Header from "../../Header/Header";
import MainMenu from "../../MainMenu/MainMenu";
import UserForm from "./UserForm";

const AddUser = () => {
    const { device_id, user_index, from } = useParams();
    return (
        <div><Header title="Device User" />
            <MainMenu menu="device" />
            <UserForm mode="Create" device_id={device_id} user_index={user_index} from={from}/>
        </div>
    )
}
export default AddUser;