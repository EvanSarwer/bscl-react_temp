import AppUserForm from "./AppUserForm";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
const EditAppUser = () => {
    const { id } = useParams();
    return (
        <div><Header title="App User" />
            <AppUserForm mode="Edit" id={id} />
        </div>
    )
}
export default EditAppUser;