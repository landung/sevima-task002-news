import React from 'react';

const ALertComp = (props) => {
    let alertColor = 'danger';
    
    if(!props.data.postError) {
        alertColor = 'success';
    }

    return (
        <div className={`alert alert-${alertColor} alert-dismissible fade show`} role="alert">
        {props.data.postMessage}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
    )
}

export default ALertComp;