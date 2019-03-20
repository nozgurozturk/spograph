import React, { Component } from "react";
import styled from "styled-components";
import _ from "lodash";
import Chart from "react-apexcharts";

const Time = styled.div`
  width: 100vw;
`;

export default class Timechart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        labels: [],
        colors: [
          "#ff3b7c",
          "#ff3a92",
          "#ff39a8",
          "#ff37d6",
          "#fb35ff",
          "#cf33ff",
          "#a431ff",
          "#7d2fff",
          "#592dff",
          "#382cff",
          "#2a3aff",
          "#2851ff",
          "#2765ff",
          "#2677ff",
          "#2586ff",
          "#2493ff",
          "#249dff",
          "#23a6ff",
          "#23adff",
          "#23b2ff",
          "#23b6ff"
        ],
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 360,
            hollow: {
              margin: 0,
              size: "40%",
              background: "transparent",
              position: "front"
            },
            track: {
              show: true,
              background: "#f2f2f2",
              strokeWidth: "100%",
              opacity: 1,
              margin: 2
            },
            dataLabels: {
              name: {
                fontSize: "22px",
                fontFamily: "futura-pt"
              },
              value: {
                fontSize: "16px",
                fontFamily: "futura-pt",
                color: "#3a3a3a"
              },
              total: {
                show: true,
                label: "Total Minutes"
              }
            }
          }
        }
      },
      series: []
    };
  }
  componentDidMount() {
    setTimeout(() => {
        this.getData();
    }, 1000);
  }
  getData = () => {
    const labels = _.map(this.props.array, "name");
    const milisecond = _.map(this.props.array, "duration_ms");
    const msToMinutes = n => {
      return (Math.floor(n) / 6) * (1 / 10000);
    };
    const minutes = _.map(milisecond, msToMinutes);
    const max = _.max(minutes);
    const minToPerc = n => {
      return Math.floor((n * 100) / max);
    };
    const percentd = _.map(minutes, minToPerc);
    this.setState({
        options: { ...this.state.options,
          labels: labels,
          plotOptions: { ...this.state.options.plotOptions,
            radialBar: { ...this.state.options.plotOptions.radialBar,
              dataLabels: { ...this.state.options.plotOptions.radialBar.dataLabels,
                value: { ...this.state.options.plotOptions.radialBar.dataLabels.value,
                  formatter: val => {
                    return Math.floor((val / 10) * this.max) / 10 + " minutes";
                  }
                },
                total: { ...this.state.options.plotOptions.radialBar.dataLabels.total,
                  formatter: () => {
                    return Math.floor(
                      _.reduce(minutes, (sum, n) => {
                        return sum + n;
                      })
                    );
                  }
                }
              }
            }
          }
        }, series : percentd
      });
  };
  render() {
   
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
          width="60%"
        />
      </div>
    );
  }
}
