const Footer = () => {
    return (
        <div>
            <br></br>
            <br></br>
            <br/>
            <div class="sidenav-overlay"></div>
            <div class="drag-target"></div>

            {/* <!-- BEGIN: Footer-->footer-static */}
            <footer class="footer fixed-bottom footer-light navbar-border navbar-shadow">
                <p class="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
                    <div class="row">
                        <span class="col-md text-left d-block d-md-inline-block pt-1">Copyright &copy; 2022 </span>

                        <div class="col-md-8">
                            <div class="row justify-content-center">
                                <span class="col-md-2 text-right d-none d-md-inline-block pt-1" style={{ whiteSpace: 'nowrap' }}>Jointly Developed by</span>
                                <div class="col-md-6 ">
                                    <table class="justify-content-left">
                                        <tr style={{ borderBottom: '0.5pt', borderBottom: 'thin solid', borderBottomColor: 'grey' }}>
                                            <td><a class="text-bold-800 grey darken-2"  href="http://www.bscl.gov.bd/" target="_blank">Bangladesh Satellite Company Limited <img style={{ zoom: 0.13 }} class="brand-logo" alt="aiub logo" src="../../../app-assets/images/logo/bscl-logo.png"></img></a></td>

                                        </tr>
                                        <tr>
                                            <td ><a class="text-bold-800 grey darken-2" href="https://www.aiub.edu/" target="_blank">American International University-Bangladesh <img style={{ zoom: 0.29 }} class="brand-logo" alt="aiub logo" src="../../../app-assets/images/logo/aiub-logo.png"></img></a></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>


                        <span class="col-md text-right d-none d-lg-block pt-1" style={{ whiteSpace: 'nowrap' }}>TRP-Measurement-System <i class="ft-bar-chart-2 pink"></i><span id="scroll-top"></span></span>

                    </div>



                    {/* <span class="float-md-left d-block d-md-inline-block">Copyright &copy; 2022 <a class="text-bold-800 grey darken-2" href="http://www.bscl.gov.bd/" target="_blank">BSCL</a></span>
                    <span class="float-md-center d-block d-md-inline-block">R&D &nbsp; <a class="text-bold-800 grey darken-2" href="https://www.aiub.edu/" target="_blank"><img style={{ zoom: 0.3 }} class="brand-logo" alt="aiub logo" src="../../../app-assets/images/logo/aiub-logo.png"></img>&nbsp;&nbsp;&nbsp;AIUB</a></span>
                    <span class="float-md-right d-none d-lg-block">TRP-Measurement-System <i class="ft-bar-chart-2 pink"></i><span id="scroll-top"></span></span> */}
                </p>
            </footer>
            {/* <!-- END: Footer--> */}
        </div>
    )
}
export default Footer;