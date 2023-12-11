import axiosConfig from '../axiosConfig';
import { useParams } from "react-router-dom";
import { useState,useEffect } from 'react';
import Header from '../Header/Header';
import MainMenu from '../MainMenu/MainMenu';
import Select from 'react-select';

const DeviceDetailsView=()=>{
    const { id } = useParams();
    const [deviceID, setDeviceID] = useState("");
    const [deviceBoxID, setDeviceBoxID] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [socioStatus, setSocioStatus] = useState("");
    const [economicStatus,setEconomicStatus] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [getLatitude, setGetLatitude] = useState("");
    const [getLongitude, setGetLongitude] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [deviceUsers, setDeviceUsers] = useState([]);

    const [contactPerson, setContactPerson] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [altContactNumber, setAltContactNumber] = useState("");
    const [mobileFinancialService, setMobileFinancialService] = useState("");
    const [mobileFinancialNumber, setMobileFinancialNumber] = useState("");
    const [otherFinancial, setOtherFinancial] = useState("");
    const [otherFinancialService, setOtherFinancialService] = useState("");
    const [otherFinancialNumber, setOtherFinancialNumber] = useState("");
    const [houseName, setHouseName] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [roadNumber, setRoadNumber] = useState("");
    const [stateName, setStateName] = useState("");
    const [wardNo, setWardNo] = useState("");
    const [zoneThana, setZoneThana] = useState("");
    const [cityCorporation, setCityCorporation] = useState("");
    const [cityName, setCityName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [districtName, setDistrictName] = useState("");
    const [householdCondition, setHouseholdCondition] = useState("");
    const [installerName, setInstallerName] = useState("");
    const [serveyDate, setServeyDate] = useState("");
    const [installationDate, setInstallationDate] = useState("");
    const [description, setDescription] = useState("");
    const [tvType, setTvType] = useState("");
    const [tvBrand, setTvBrand] = useState("");
    const [tvPlacement, setTvPlacement] = useState("");
    const [gsmSignalStrength, setGsmSignalStrength] = useState("");
    const [wifi, setWifi] = useState("");
    const [wifiSignalStrength, setWifiSignalStrength] = useState("");
    const [stbProviderName, setStbProviderName] = useState("");
    const [stbSubscriptionType, setStbSubscriptionType] = useState("");
    const [stbSubscriptionCharge, setStbSubscriptionCharge] = useState("");
    const [availableBoxes, setAvailableBoxes] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        axiosConfig.get("/device/get/" + id).then((rsp)=>{
            var obj = rsp.data.device;
            console.log(rsp.data);
            setDeviceUsers(rsp.data.deviceUser);
                setDeviceID(obj.id);
                setDeviceBoxID(obj.deviceBoxId)
                setDeviceName(obj.device_name);
                setMonthlyIncome(obj.monthly_income);
                
                setContactPerson(obj.contact_person);
                setContactEmail(obj.contact_email);
                setContactNumber(obj.contact_number);
                setAltContactNumber(obj.alt_number);
                setMobileFinancialService(obj.payment_type);
                setMobileFinancialNumber(obj.payment_number);
                setOtherFinancialService(obj.other_payment_type);
                setOtherFinancialNumber(obj.other_payment_number);
                setHouseName(obj.house_name);
                setHouseNumber(obj.house_number);
                setRoadNumber(obj.road_number);
                setStateName(obj.state_name);
                setWardNo(obj.ward_no);
                setZoneThana(obj.zone_thana);
                setCityCorporation(obj.city_corporation);
                setCityName(obj.city_Name);
                setZipCode(obj.zip_code);
                setDistrictName(obj.district);
                setHouseholdCondition(obj.household_condition);
                setDescription(obj.description);
                setTvType(obj.tv_type);
                setTvBrand(obj.tv_brand);
                setTvPlacement(obj.tv_placement);
                setGsmSignalStrength(obj.gsm_signal_strength);
                setWifi(obj.wifi);
                setWifiSignalStrength(obj.wifi_signal_strength);
                setStbProviderName(obj.stb_provider_name);
                setStbSubscriptionType(obj.stb_subscription_type);
                setStbSubscriptionCharge(obj.stb_subscription_charge);
                setInstallerName(obj.installer_name);
                setServeyDate(obj.survey_date);
                setInstallationDate(obj.installation_date);

                setGetLatitude(obj.lat);
                setGetLongitude(obj.lng);
                setLatitude(obj.lat);
                setLongitude(obj.lng);

                switch(obj.economic_status){
                    case "a":
                        setEconomicStatus("SEC A");;
                        break;
                    case "b":
                        setEconomicStatus("SEC B");
                        break;
                    case "c":
                        setEconomicStatus("SEC C");
                        break;
                    case "d":
                        setEconomicStatus("SEC D");
                        break;
                    case "e":
                        setEconomicStatus("SEC E");
                        break;
                }

                switch(obj.socio_status){
                    case "u":
                        setSocioStatus("Urban");
                        break;
                    case "r":
                        setSocioStatus("Rural");
                        break;
                }
                
                
           
        },(err)=>{
            if (err.response.status === 422) {
                //setErrMsg(err.response.data);
            }

        });



        axiosConfig.get("/device/available-boxes").then((rsp)=>{
            setAvailableBoxes(rsp.data);
        },(err)=>{
            if (err.response.status === 422) {
                //setErrMsg(err.response.data);
            }

        });

    }, []);


    const updateDeviceBoxID = () => {
        axiosConfig.post("/device/update-box-id", {
            device_id: deviceID,
            device_box_id: deviceBoxID
        }).then((rsp)=>{
            console.log(rsp.data);
            setMsg(rsp.data.message);
            setDeviceBoxID(rsp.data.device_box_id);
        },(err)=>{
            if (err.response.status === 422) {
                setMsg(err.response.data.message);

            }else if (err.response.status === 423) {
                setMsg(err.response.data.error_message);

            }
            console.log(err.response);

        });
    }


    const NewDeviceBoxID = () => {
        axiosConfig.post("/device/new-box-id", {
            device_id: deviceID,
        }).then((rsp)=>{
            console.log(rsp.data);
            setMsg(rsp.data.message);
            setDeviceBoxID(rsp.data.device_box_id);
        },(err)=>{
            console.log(err.response);

        }); 
    }

    return (
        <div>
        <Header title="Program TRP" />
        <MainMenu menu="Program TRP" />
        <div class="app-content content" style={{ backgroundColor: "azure" }}>
        <div class="content-wrapper" >
        <a href={"/device/box/history/"+deviceID} class="btn btn-primary btn-sm float-right">Box History</a>

           
            <div class="content-body row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                {/* <h1 class="text-center">Household Name : {deviceID} {deviceName}</h1> */}
                <h1 class="text-center">Household Name : {deviceName}</h1>
                <table class="table display nowrap table-striped table-bordered">
                    <tr>
                        <td>Device Box ID:</td>
                        <td class="border-0 row">
                            <div class="col-md-8">
                                <Select
                                    placeholder="Select Box ID"
                                    options={availableBoxes.map(box => ({ label: box.id, value: box.id }))}
                                    onChange={opt => setDeviceBoxID(opt.value)}
                                    value={{ label: deviceBoxID, value: deviceBoxID }}
                                /> 
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-primary btn-sm" onClick={() => updateDeviceBoxID() } >Update</button>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-info btn-sm ml-1" onClick={() => NewDeviceBoxID() } >New</button>
                            </div>

                            <span >{msg}</span>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>Contact Person</td>
                        <td>{contactPerson}</td>
                    </tr>
                    <tr>
                        <td>Contact No</td>
                        <td>{contactNumber}</td>
                    </tr>
                    <tr>
                        <td>Alternative No</td>
                        <td>{altContactNumber}</td>
                    </tr>
                    
                    <tr>
                        <td>Email</td>
                        <td>{contactEmail}</td>
                    </tr>
                    <tr>
                        <td>Socio Status</td>
                        <td>{socioStatus}</td>
                    </tr>

                    <tr>
                        <td>Economic Status</td>
                        <td>{economicStatus}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{contactEmail}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>House: {houseName},{houseNumber},Road#:{roadNumber}</td>
                    </tr>
                    <tr>
                        <td>Area/State</td>
                        <td>{stateName}</td>
                    </tr>
                    <tr>
                        <td>Ward</td>
                        <td>{wardNo}</td>
                    </tr>
                    <tr>
                        <td>City Corporation</td>
                        <td>{cityCorporation}</td>
                    </tr>
                    <tr>
                        <td>District</td>
                        <td>{districtName}</td>
                    </tr>
                    <tr>
                        <td>Latitude & Longitude</td>
                        <td>{latitude}, {longitude}</td>
                    </tr>
                    <tr>
                        <td>Household Condition</td>
                        <td>{householdCondition}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{description}</td>
                    </tr>
                    <tr>
                        <td>TV Details</td>
                        <td>{tvType} {tvBrand}, Placed in {tvPlacement}</td>
                    </tr>
                    <tr>
                        <td>GSM Status</td>
                        <td>{gsmSignalStrength}</td>
                    </tr>
                    <tr>
                        <td>Wifi</td>
                        <td>{wifi}, {wifiSignalStrength}</td>
                    </tr>
                    <tr>
                        <td>STB Provider</td>
                        <td>{stbProviderName}</td>
                    </tr>
                    <tr>
                        <td>STB Subscription</td>
                        <td>{stbSubscriptionCharge} {stbSubscriptionType}</td>
                    </tr>
                    <tr>
                        <td>Installation Date</td>
                        <td>{installationDate} </td>
                    </tr>
                    <tr>
                        <td>Deployer</td>
                        <td>{installerName}</td>
                    </tr>
                    <tr>
                        <td>Survey Date</td>
                        <td>{serveyDate} </td>
                    </tr>
                </table>
                </div>
                <div class="col-md-2"></div>
            </div>
                
        </div>
    </div>
    </div>
        
    )

}

export default DeviceDetailsView;