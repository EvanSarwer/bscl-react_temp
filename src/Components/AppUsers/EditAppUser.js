import AppUserForm from "./AppUserForm";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import MainMenu from "../MainMenu/MainMenu";
const EditAppUser = () => {
    const { id } = useParams();
    return (
        <div><Header title="App User" />
            <MainMenu menu="appusers" />
            <AppUserForm mode="Edit" id={id} />
        </div>
    )
}
export default EditAppUser;