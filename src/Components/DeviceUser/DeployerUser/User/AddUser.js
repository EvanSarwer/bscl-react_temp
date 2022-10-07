import { useParams } from "react-router-dom";
import MainMenuDeployer from "../../../MainMenu/MainMenuDeployer";
import Header from "../../../Header/Header";
import UserForm from "./UserForm";

const AddUser = () => {
    const { device_id, user_index, from } = useParams();
    console.log(from);
    return (
        <div><Header title="Device User" />
            <MainMenuDeployer menu="device" />
            <UserForm mode="Create" device_id={device_id} user_index={user_index} from={from}/>
        </div>
    )
}
export default AddUser;