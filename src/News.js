import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import News_Items from "./News_Items";
import Spinner from "./Spinner.js";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticle] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updatechange();
  }, []);

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
      props.category
    }&apiKey=${props.apiKey}&pageSize=10&page=${page + 1}`;
    setPage(page + 1);
    let data = await fetch(url);
    let res = await data.json();
    console.log(url);
    setArticle(articles.concat(res.articles));
    setLoading(false);
    setTotalResults(res.totalResults);
  };
  const updatechange = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&pageSize=10&page=${page}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let res = await data.json();
    props.setProgress(70);
    console.log(url);
    setArticle(res.articles);

    setTotalResults(res.totalResults);
    setLoading(false);
    document.title = props.category;
    props.setProgress(100);
  };
  // handlenextclick = async () => {
  //   setPage(page + 1);
  //   updatechange();
  // };
  // handleprevclick = async () => {
  //   page -= 1;
  //   updatechange();
  // };

  return (
    <div>
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
      ></InfiniteScroll>
      <h2 style={{ textAlign: "center", marginTop: "55px" }}>Top Headlines</h2>
      {loading && <Spinner />}
      {console.log(loading)}
      <div className="container">
        <div className="row">
          {articles.map((Element) => {
            return (
              <div
                className="col-md-4"
                // val={setState({ key: key + 1 }) }
              >
                <News_Items
                  key={Element.url}
                  title={Element.title.slice(0, 45)}
                  description={
                    Element.description ? Element.description.slice(0, 88) : ""
                  }
                  let
                  news_url={
                    Element.url
                      ? Element.url
                      : "https://i.ytimg.com/vi/eY5cZITcrF4/maxresdefault.jpgs"
                  }
                  publishedAt={Element.publishedAt}
                  imageUrl={Element.urlToImage}
                  page={page}
                  author={Element.author}
                  source={Element.source.name}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="container">
        <div
          className="d-flex justify-content-between"
          style={{ textAlign: "right" }}
        >
          {/* <button
              href=""
              className="btn btn-dark mx-3 "
              onClick={handleprevclick}
              disabled={page <= 1}
            >
              &larr;Previous
            </button>
            <button
              href="/"
              className="btn btn-dark "
              onClick={handlenextclick}
              disabled={totalResults / 10 < page}
            >
              Next&rarr;
            </button> */}
        </div>
      </div>
    </div>
  );
};

News.defaultProps = {
  category: "general",
};
News.propTypes = {
  category: PropTypes.string,
};
export default News;
