import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Overview from "../Overview/Overview";
import DeviceViewingStatusList from "../DeviceUser/DeviceViewingStatusList";
import ViewLog from "../ViewLog/ViewLog";

function MainPage() {

    return (
      <div>
      
      <BrowserRouter>
        <Routes>

           {/* //// Define Routes */}
          <Route exact path="/overview" element={<Overview />}></Route>
          <Route exact path="/device/viewing-status" element={<DeviceViewingStatusList />}></Route>

          <Route exact path="/logs" element={<ViewLog />}></Route>

          <Route
          path="*"
          element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
      </div>
      );
  }
  
  export default MainPage;