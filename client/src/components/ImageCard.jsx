import React from "react";

class ImageCard extends React.Component {
  render() {
    return (
      <div className="column is-3">
        <div className="card">
          <div className="card-image">
            <figure className="image is-4by3">
              <img
                alt={this.props.alt}
                src={this.props.src}
                width={this.props.width}
              />
            </figure>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCard;
