import React from 'react'
import './dashboards.css'
const DashBoardCards = (props) => {
  return (


    


    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={props.index}>
       <div className="card h-100">
         <div className="card-body">
            <span className="authorized-badge">OPEN FOR {props.authorized}</span>
            <p className='card-title'>{props.title}</p>
            {/* <p>{props.body}</p> */}
            <div className="d-flex justify-content-between align-items-center">
                
            <a href={props.link}  >{props.body}</a>
            <div className="card-icon">{props.icon}</div>
            </div>
         </div>
       </div>
    </div>


    
  )
}

export default DashBoardCards