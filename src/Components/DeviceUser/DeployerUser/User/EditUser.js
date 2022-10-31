import { useParams } from "react-router-dom";
import MainMenu from "../../../MainMenu/MainMenu";
import Header from "../../../Header/Header";
import UserForm from "./UserForm";


const EditUser = () => {
    const { id, from } = useParams();
    console.log(from);
    return (
        <div><Header title="Device User" />
            <MainMenu menu="device" />
            <UserForm mode="Edit" id={id} from={from} />
        </div>
    )
}
export default EditUser;