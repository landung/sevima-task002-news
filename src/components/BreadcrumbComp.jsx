import React from 'react';

const BreadcrumComp = (props) => {

    return (
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            {
                props.page.map(page => {
                   return <li key={page.name} className={`breadcrumb-item${page.active ? ' active' : ''}`} aria-current="page">{page.name}</li>
                })
            }
        </ol>
        </nav>
    )
}

export default BreadcrumComp;