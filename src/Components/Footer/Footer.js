const Footer = () => {
    return (
        <div>
            <div class="sidenav-overlay"></div>
            <div class="drag-target"></div>

            {/* <!-- BEGIN: Footer--> */}
            <footer class="footer footer-static footer-light navbar-border navbar-shadow">
                <p class="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
                    {/* <span class="float-md-left d-block d-md-inline-block">Copyright &copy; 2022 <a class="text-bold-800 grey darken-2" href="http://www.bscl.gov.bd/" target="_blank">BSCL</a></span> */}
                    <span class="float-md-right d-none d-lg-block">TRP-Measurement-Project <i class="ft-bar-chart-2 pink"></i><span id="scroll-top"></span></span></p>
            </footer>
            {/* <!-- END: Footer--> */}
        </div>
    )
}
export default Footer;