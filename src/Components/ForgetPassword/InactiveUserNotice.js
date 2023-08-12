

const InactiveUserNotice = () => {

    return (
        
            <div className="content-wrapper">
                <div className="content-header row">
                </div>
                <div className="content-body">
                    <section className="row flexbox-container">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <div className="col-lg-4 col-md-8 col-10 box-shadow-2 p-0">
                                <div className="card border-grey border-lighten-3 px-2 py-2 m-0">
                                    <div className="card-header border-0 pb-0">
                                        <div className="card-title text-center">
                                            <img class="w-25" src="/app-assets/images/logo/bscl-logo.png" alt="branding logo" />
                                        </div>
                                        <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2"><span>Account Notice</span></h6>
                                    </div>
                                    <div className="card-content">
                                        <div className="card-body">
                                                <span class="text-danger">Your Account Has Been Deactivated. Please contact with our team.</span>
                                                
                                        </div>
                                    </div>
                                    <div className="card-footer border-0">
                                        <p className="float-sm-left text-center"><a href="/" className="card-link">Login</a></p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        

    )
}
export default InactiveUserNotice;