import React from "react";
import { Howl, Howler } from "howler";
import "./index.css";

class Station extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
  }

  componentDidMount() {
    this.stationAudio = new Howl({
      src: [this.props.station.src],
      html5: true,
      format: ["mp3", "aac"],
    });
  }

  onPlay() {
    this.setState({ isPlaying: false });
    Howler.stop();

    this.stationAudio.play();
    this.setState({ isPlaying: true });
  }

  onPause() {
    this.stationAudio.pause();
    this.setState({ isPlaying: false });
  }

  render() {
    return (
      <tr>
        <td>
          <button className="play" onClick={this.onPlay}>
            &#9658;
          </button>
          <button className="pause" onClick={this.onPause}>
            &#10074;&#10074;
          </button>{" "}
          <b>{this.props.station.freq}</b> {this.props.station.title}
        </td>
      </tr>
    );
  }
}

export default Station;
