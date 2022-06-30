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
                    <h3 class={clrCount}>{props.count}</h3>
                    <div class="media-body text-left">
                        <h6>{props.title}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopCount;