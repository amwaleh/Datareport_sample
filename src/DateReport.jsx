import React from "react";
import "./styles.css";
import times from "lodash/times";
import DownloadAction from "./DownloadAction";
import { Button } from "@material-ui/core";
import { DateRangePicker } from "materialui-daterange-picker";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import { Dialog } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import data2 from "./dateData.json";

const dateFilter = (start_date, end_date) => {
  return data2.filter((x) => {
    const today = new Date(x.start_date).getTime(); // gives 1486492200000
    const start = new Date(start_date).getTime();
    const end = new Date(end_date).getTime();
    if (today <= end && today >= start) {
      return x;
    }
  });
};

export default function App() {
  const [week, setWeek] = React.useState(6);
  const [year, setYear] = React.useState(2020);
  const filterByWeek = () => {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 0, 1);
    start.setDate(start.getDate() + (week - 1) * 7);
    end.setDate(end.getDate() + week * 7);
    const result = dateFilter(start, end);

    return result;
  };
  const weekly = filterByWeek();
  const total_prod = weekly.reduce((obj, x) => {
    if (!obj[x.product]) {
      obj[x.product] = { assigned: 0, delivered: 0 };
    }
    const assigned = obj[x.product].assigned + x.assigned;
    const delivered = obj[x.product].delivered + x.delivered;
    obj[x.product] = { ...obj[x.product], assigned, delivered };
    return obj;
  }, {});
  const handleYearChange = (e) => {
    const { value } = e.target;
    setYear(value);
  };
  const handleWeekChange = (e) => {
    const { value } = e.target;
    setWeek(value);
  };

  return (
    <div className="App">
      <div className="date-section">
        <div className="col-4">
          <select name="year" id="year" onChange={handleWeekChange}>
            <option value={week}> Filter by week </option>
            {times(52, (x) => (
              <option value={x}> week {x + 1} </option>
            ))}
          </select>
        </div>
        <div className="col-4">
          <select name="year" id="year" onChange={handleYearChange}>
            <option value={2020}> {year || "Type by year"} </option>
            <option value={2018}> 2018 </option>
            <option value={2019}> 2019 </option>
            <option value={2020}> 2020 </option>
          </select>
        </div>
        <Button onClick={() => DownloadAction("download")}>
          {" "}
          <CloudDownloadIcon fontSize="large" />{" "}
        </Button>
      </div>
      {Object.keys(total_prod).length ? (
        <table id="download" className="table_main " width="100%">
          <caption>
            {" "}
            <Typography>
              Viewing data for week {Number(week) + 1} : year {year}{" "}
            </Typography>
          </caption>
          {Object.keys(total_prod).map((x) => {
            return (
              <>
                <tr>
                  <th colspan="2"> {x} </th>
                </tr>
                <tr>
                  <td>Assigned </td>
                  <td>{total_prod[x].assigned}</td>
                </tr>
                <tr>
                  <td>delivered </td>
                  <td>{total_prod[x].delivered}</td>
                </tr>
              </>
            );
          })}
        </table>
      ) : (
        <h2> NO DATA </h2>
      )}
    </div>
  );
}
