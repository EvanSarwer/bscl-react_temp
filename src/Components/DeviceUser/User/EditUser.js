import { useParams } from "react-router-dom";
import Header from "../../Header/Header";
import MainMenu from "../../MainMenu/MainMenu";
import UserForm from "./UserForm";


const EditUser = () => {
    const { id } = useParams();
    return (
        <div><Header title="Device User" />
            <MainMenu menu="device" />
            <UserForm mode="Edit" id={id} />
        </div>
    )
}
export default EditUser;