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
    n: "Today's Hits 107.7",
    u: "https://rfcmedia.streamguys1.com/MusicPulse.mp3",
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
            "1de4755cdamsh616e60334276200p18dcf7jsn3db37aad5a52",
          "x-rapidapi-host":
            "30-000-radio-stations-and-music-charts.p.rapidapi.com",
        },
      });
      console.log(response.data);
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
