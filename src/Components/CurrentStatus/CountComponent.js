const CountComponent = (props) => {

    const cls = props.icon + " font-medium-2 float-right";
    const clrCount = props.color + " font-medium-2";
    const clrProgress = "progress-bar bg-gradient-x-" + props.color;

    return (
        <div class="card pull-up">
            <div class="card-content">
                {(() => {
                    if (props.title === "Total Device") {
                        return <div class="card-body">
                            <div class="media d-flex">
                                <div class="media-body text-left">
                                    <h3 class={clrCount}>{props.stb}<div style={{ fontSize: '75%' }}>STB({props.stb})</div></h3>
                                </div>
                                <div>
                                    <i class={cls}></i>
                                </div>
                            </div>
                            <h6 style={{ fontSize: '95%' }}>{props.title}</h6>
                            <div class="progress progress-sm mt-1 mb-0 box-shadow-2">
                                <div class={clrProgress} role="progressbar" style={{ width: props.percentage }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    } else if(props.title === "Total Viewer"){
                        return <div class="card-body">
                            <div class="media d-flex">
                                <div class="media-body text-left">
                                    <h3 class={clrCount}>{props.count}<div style={{ fontSize: '75%' }}>STB({props.count})</div></h3>
                                </div>
                                <div>
                                    <i class={cls}></i>
                                </div>
                            </div>
                            <h6 style={{ fontSize: '95%' }}>{props.title}</h6>
                            <div class="progress progress-sm mt-1 mb-0 box-shadow-2">
                                <div class={clrProgress} role="progressbar" style={{ width: props.percentage }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    } 
                    else if(props.title === "Active Device & Viewer"){
                        return <div class="card-body">
                            <div class="media d-flex">
                                <div class="media-body text-left">
                                    <h3 class={clrCount}>{props.stb}<div style={{ fontSize: '75%' }}>STB Viewer({props.count}) </div></h3>
                                </div>
                                <div>
                                    <i class={cls}></i>
                                </div>
                            </div>
                            <h6 style={{ fontSize: '95%' }}>{props.title}</h6>
                            <div class="progress progress-sm mt-1 mb-0 box-shadow-2">
                                <div class={clrProgress} role="progressbar" style={{ width: props.percentage }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                    }
                })()}




            </div>
        </div>
    )
}

export default CountComponent;