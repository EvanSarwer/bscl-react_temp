import axiosConfig from '../axiosConfig';
import { useState,useEffect } from 'react';

const PopUpDetails = ({id})=>{
    const [deviceID, setDeviceID] = useState("");
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
    useEffect(()=>{
        axiosConfig.get("/device/get/" + id).then((rsp)=>{
            var obj = rsp.data.device;
            console.log(deviceUsers);
            setDeviceUsers(rsp.data.deviceUser);
                setDeviceID(obj.id);
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
                        setEconomicStatus("Poorest");;
                        break;
                    case "b":
                        setEconomicStatus("Poorer");
                        break;
                    case "c":
                        setEconomicStatus("Middle");
                        break;
                    case "d":
                        setEconomicStatus("Richer");
                        break;
                    case "e":
                        setEconomicStatus("Richest");
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
    });

    return (
        <div class="modal fade" id={`exampleModal_${id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{deviceName}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table display nowrap table-striped table-bordered">
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
                
                </div>
            </div>
        </div>
    )
}
export default PopUpDetails;