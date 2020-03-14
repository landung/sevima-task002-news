import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const NewsListBackendComp = (props) => {
    return (
        <div className="col-md-12">
            <div className="card h-50">
                <div className="card-block p-1">
                    <p className="card-title news-title">
                        <Link to={`/news-detail-backend/${props.data.id}`}>{props.data.title}</Link>
                    </p>
                    <div className="mb-1 text-muted"><Moment format="D MMM YYYY" withTitle>{props.data.created_at}</Moment></div>
                    <p className="card-text">
                        <img src="http://placeimg.com/150/100/tech" className="rounded float-left p-3" alt="..." />
                        <span className="block-ellipsis">{props.data.content}</span>
                    </p>
                </div>
            </div>            
        </div>
    )
}

export default NewsListBackendComp;