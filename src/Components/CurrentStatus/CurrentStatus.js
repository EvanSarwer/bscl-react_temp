import CountComponent from "./CountComponent";

const CurrentStatus = () => {
    return (

        // {/* <!-- eCommerce statistic --> */}
        <div class="row gx-1">

            <div class="col-xl-2 col-lg-1 col-12">
                <CountComponent title="Total User" count="200" icon="icon-user-follow success" color="success" percentage="100%" />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <CountComponent title="Active User" count="147" icon="icon-user-follow success" color="success" percentage="74%" />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <CountComponent title="Top Reach" count="ATN" icon="icon-pie-chart warning" color="warning" percentage="" />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <CountComponent title="Top TVR" count="BTV" icon="icon-pie-chart info" color="info" percentage="" />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <CountComponent title="Top Share" count="NTV" icon="icon-pie-chart danger" color="danger" percentage="" />
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <CountComponent title="Top Program" count="Tom & Jerry" icon="icon-pie-chart warning" color="" percentage="" />
            </div>
            {/* <div class="col-xl-2 col-lg-1 col-12">
                <CountComponent title="" count="" icon="" color="" percentage=""/>
            </div>
            <div class="col-xl-2 col-lg-1 col-12">
                <CountComponent title="" count="" icon="" color="" percentage=""/>
            </div> */}
        </div>



    )
}
export default CurrentStatus;