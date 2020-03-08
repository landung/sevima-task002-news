import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const NewsListComp = (props) => {
    return (
        <div className="col-md-6">
            <div className="card h-100">
                <div className="card-block p-1">
                    <p className="card-title">
                        <h3 className="mb-0"><Link to={`/news-detail/${props.data.id}`}>{props.data.title}</Link></h3>
                    </p>
                    <div className="mb-1 text-muted"><Moment format="D MMM YYYY" withTitle>{props.data.created_at}</Moment></div>
                    <p className="card-text">
                        <img src="http://placeimg.com/200/150/tech" className="rounded float-left p-3" alt="..." />
                        <span className="block-ellipsis">{props.data.content}</span>
                    </p>
                </div>
            </div>            
        </div>
    )
}

export default NewsListComp;