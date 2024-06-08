import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imgUrl,newsUrl,author,date,source}=this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0'
          }}>
        <span class= "badge rounded-pill bg-danger">{source}</span>
        </div>
            <img src={!imgUrl?"https://images.moneycontrol.com/static-mcnews/2023/09/market_volatile-13-770x433.jpg":imgUrl} className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {!author?"Zoro":author} on {new Date(date).toDateString()}</small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
</div>
      </div>
    )
  }
}

export default Newsitem