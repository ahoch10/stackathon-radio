import React from "react";
import Station from "./Station";

const stations = [
  {
    freq: "81.4",
    title: "BBC Radio 1",
    src: "http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_q",
    howl: null,
  },
  {
    freq: "89.9",
    title: "Hip Hop Hits",
    src: "https://streaming.radio.co/s97881c7e0/listen",
    howl: null,
  },
  {
    freq: "98.9",
    title: "CNN",
    src: "https://tunein.streamguys1.com/cnn-new",
    howl: null,
  },
  {
    freq: "103.3",
    title: "80's Hits",
    src: "https://rfcmedia.streamguys1.com/80hits.mp3",
    howl: null,
  },
  {
    freq: "107.7",
    title: "Today's Hits",
    src: "https://rfcmedia.streamguys1.com/MusicPulse.mp3",
    howl: null,
  },
];

class Player extends React.Component {
  constructor() {
    super();
    this.state = { keyword: null };
    this.handleChange = this.handleChange.bind.this;
  }

  handleChange(e) {
    this.setState({ keyword: e.target.value });
    console.log(this.state);
  }
  render() {
    return (
      <div className="player">
        <h1>Radio Player</h1>
        Search stations:
        <input onChange={this.handleChange}></input>
        <br />
        <br />
        <table>
          <tbody>
            {stations.map((station) => {
              return <Station key={station.freq} station={station} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Player;
