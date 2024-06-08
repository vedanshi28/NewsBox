import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:8,
    category:'business'
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  capatalise=(string)=>{
  return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props){
    super(props);
    this.state={
      articles:[],
      loading:true,
      page:1,
      totalResults:0
    }
    document.title=`${this.capatalise(this.props.category)} - NewsBox`;
  }
  //for showing news from news api
 async componentDidMount(){
  this.props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=36dff65b5bf149ff869893d940b07d1f&page=1&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data= await fetch(url);
    this.props.setProgress(30);
    let parsedData= await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles:parsedData.articles,
      totalResults:parsedData.totalResults
    })
    this.props.setProgress(100);
  }
  fetchMoreData=async()=>{
    this.setState({page:this.state.page+1});
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=36dff65b5bf149ff869893d940b07d1f&page=1&pageSize=${this.props.pageSize}`
    let data= await fetch(url);
    let parsedData= await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults
    })
  }
  handleNextClick= async()=>{
    if(!(this.state.page+1>Math.ceil(this.state.totalResults/20))){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=36dff65b5bf149ff869893d940b07d1f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true});
      let data= await fetch(url);
      let parsedData= await data.json();
  
      this.setState({
        page:this.state.page+1,
        articles:parsedData.articles,
        loading:false
      })
    }
}
  handlePrevClick=async()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=36dff65b5bf149ff869893d940b07d1f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true});
    let data= await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);

    this.setState({
      page:this.state.page-1,
      articles:parsedData.articles,
      loading:false
    })
    
  }
  render() {
    return (
      <>
        <h1 className="text-center" style={{margin:"35px 0px",marginTop:'90px'}}>NewsBox Top {this.capatalise(this.props.category)} Headlines</h1>
        {/*this.state.loading && <Spinner/>*/}
        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length!==this.state.totalResults}
        loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
        { this.state.articles.map((element)=>{
         return <div className="col-md-4" key={element.url}>
              <Newsitem title={element.title?element.title:""}  description={element.description?element.description:""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
           </div>
        })}
           </div>
           </div>
        </InfiniteScroll>
         {/* <div className="container d-flex justify-content-between">
           <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
           <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>*/} 
      </>
    )
  }
}

export default News