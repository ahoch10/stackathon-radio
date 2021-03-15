import React from "react";
import Station from "./Station";
import axios from "axios";

const stations = [
  {
    n: "98.9 CNN",
    u: "https://tunein.streamguys1.com/cnn-new",
    howl: null,
  },
  {
    n: "103.3 80's Hits",
    u: "https://rfcmedia.streamguys1.com/80hits.mp3",
    howl: null,
  },
  {
    n: "107.7 Today's Hits",
    u: "https://rfcmedia.streamguys1.com/MusicPulse.mp3",
    howl: null,
  },
  {
    n: "99.5 Clasical Radio",
    u: "https://streams.audio.wgbh.org:8204//classical-hi",
    howl: null,
  },
];

class Player extends React.Component {
  constructor() {
    super();
    this.state = { keyword: null, stations: stations };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ keyword: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
    try {
      const response = await axios.request({
        method: "GET",
        url:
          "https://30-000-radio-stations-and-music-charts.p.rapidapi.com/rapidapi",
        params: { country: "ALL", keyword: this.state.keyword, genre: "ALL" },
        headers: {
          "x-rapidapi-key":
            "68a1df0dfbmsh46737b2f148d4c0p1f27b5jsn171513e51771",
          "x-rapidapi-host":
            "30-000-radio-stations-and-music-charts.p.rapidapi.com",
        },
      });
      console.log("response", response);
      console.log(response.data.length);
      this.setState({ stations: response.data.results });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className="player">
        <h1>Radio Player</h1>
        <form id="search" onSubmit={this.handleSubmit}>
          <label>Search stations:</label>
          <input onChange={this.handleChange}></input>
          <button type="submit">Submit</button>
        </form>
        <br />
        <br />
        <table>
          <tbody>
            {this.state.stations.map((station) => {
              return <Station key={station.n} station={station} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Player;
