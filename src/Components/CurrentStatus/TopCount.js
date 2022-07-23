const TopCount = (props) => {

    const cls = props.icon + " font-medium-2 float-right";
    const clrCount = props.color + " font-medium-2";

    return (
        <div class="card pull-up">
            <div class="card-content">
                <div class="card-body">
                    <div class="media d-flex">
                        <div class="media-body text-left">
                            <h3 class={clrCount}></h3>
                        </div>
                        <div>
                            <i class={cls}></i>
                        </div>
                    </div>
                    <p><h3 class={clrCount}>{props.count}</h3></p>
                    <div class="media-body text-left">
                        <h5>{props.title}</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopCount;