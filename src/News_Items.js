import React from "react";

const News_Items = (props) => {
  let { title, description, imageUrl, news_url, publishedAt, author, source } =
    props;

  return (
    <div className="container my-4">
      <div className="card" style={{}}>
        <span
          className="badge bg-dark fst-italic "
          style={{ textAlign: "right" }}
        >
          {source}
        </span>
        <img
          src={
            !imageUrl
              ? "https://i.ytimg.com/vi/eY5cZITcrF4/maxresdefault.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text ">
            <small className="text-muted">
              By {author ? author : "Unknown"} on{" "}
              {new Date(publishedAt).toLocaleDateString()}
            </small>
          </p>
          <a href={news_url} className="btn btn-dark" target="_blank">
            Read More...
          </a>
        </div>
      </div>
    </div>
  );
};

export default News_Items;
