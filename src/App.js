import React, { useState } from "react";
import "./styles.css";
import pick from "lodash/pick";
import { Bar } from "react-chartjs-2";
import "./styles.css";
import DownloadAction from "./DownloadAction";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

const data = [
  {
    "Hat: Knit Acrylic": {
      Administrator: {
        units: ["{'assigned': 1, 'delivered': 1.0}"],
        total_delivered: 1,
        total_assigned: 1.0,
        delivered: [1],
        assigned: [1.0]
      },
      "maryk@poweredbypeople.io": {
        units: ["{'assigned': 10, 'delivered': 10.0}"],
        total_delivered: 10,
        total_assigned: 10.0,
        delivered: [10],
        assigned: [10.0]
      },
      "zawi@gmail.com": {
        units: ["{'assigned': 2, 'delivered': 2.0}"],
        total_delivered: 2,
        total_assigned: 2.0,
        delivered: [2],
        assigned: [2.0]
      },
      "hillodhia@gmail.com": {
        units: ["{'assigned': 10, 'delivered': 10.0}"],
        total_delivered: 10,
        total_assigned: 10.0,
        delivered: [10],
        assigned: [10.0]
      },
      "josepererh@poweredbypeople.io": {
        units: ["{'assigned': 50, 'delivered': 50.0}"],
        total_delivered: 50,
        total_assigned: 50.0,
        delivered: [50],
        assigned: [50.0]
      },
      "annemukii2@gmail.com": {
        units: ["{'assigned': 1, 'delivered': 1.0}"],
        total_delivered: 1,
        total_assigned: 1.0,
        delivered: [1],
        assigned: [1.0]
      }
    },
    "Big Botanisk Pot": {
      "mary@b.com": {
        units: ["{'assigned': 11, 'delivered': 11.0}"],
        total_delivered: 11,
        total_assigned: 11.0,
        delivered: [11],
        assigned: [11.0]
      },
      "igmirsedarcom@maliberty.com": {
        units: ["{'assigned': 11, 'delivered': 11.0}"],
        total_delivered: 11,
        total_assigned: 11.0,
        delivered: [11],
        assigned: [11.0]
      },
      "maryk@poweredbypeople.io": {
        units: ["{'assigned': 50, 'delivered': 50.0}"],
        total_delivered: 50,
        total_assigned: 50.0,
        delivered: [50],
        assigned: [50.0]
      },
      "extraessential@birdnacan.tk": {
        units: ["{'assigned': 1, 'delivered': 1.0}"],
        total_delivered: 1,
        total_assigned: 1.0,
        delivered: [1],
        assigned: [1.0]
      },
      "hillodhia@gmail.com": {
        units: ["{'assigned': 1, 'delivered': 1.0}"],
        total_delivered: 1,
        total_assigned: 1.0,
        delivered: [1],
        assigned: [1.0]
      },
      "dm@nistr.ator": {
        units: ["{'assigned': 4, 'delivered': 8.0}"],
        total_delivered: 4,
        total_assigned: 8.0,
        delivered: [4],
        assigned: [8.0]
      }
      // "Total Units" : { total_assigned: 82, total_delivered: 78}
    },
    "09": {
      Administrator: {
        units: ["{'assigned': 10, 'delivered': 10.0}"],
        total_delivered: 9,
        total_assigned: 10.0,
        delivered: [9],
        assigned: [10.0]
      },
      "mary@b.com": {
        units: ["{'assigned': 1, 'delivered': 1.0}"],
        total_delivered: 0,
        total_assigned: 1.0,
        delivered: [0],
        assigned: [1.0]
      }
      // "Total Units" : { total_assigned: 11, total_delivered: 9}
    }
  }
];

const options = {
  legend: {
    position: "left",
    labels: {
      boxWidth: 10
    }
  }
};

const allKeys = Object.keys(data[0]);
const percentDelivered = (a, d) => (d / a) * 100;
const random_rgba = () => {
  const o = Math.round,
    r = Math.random,
    s = 254;
  return (
    "rgba(" +
    o(r() * 50) +
    "," +
    o(r() * 200) +
    "," +
    o(r() * s) +
    "," +
    0.8 +
    ")"
  );
};
// const GreenRadio = withStyles({
//     root: {
//         color: green[400],
//         '&$checked': {
//             color: green[600],
//         },
//     },
//     checked: {},
// })((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles({
  datePicker: {
    "& .materialui-daterange-picker-MuiList-root-257": {
      display: "none"
    }
  }
});

// const dateFilter = (s, e) => {
//   data2.filter((x) => {
//     const today = new Date(x.start_date).getTime(); // gives 1486492200000
//     const start = new Date(s).getTime();
//     const end = new Date(e).getTime();
//     if (today <= end && today >= start) {
//       return x;
//     }
//   });
// };

// const filterByWeek = (year = 2020, week = 48) => {
//   const start = new Date(year, 0, 1);
//   const end = new Date(year, 0, 1);
//   start.setDate(start.getDate() + (week - 1) * 7);
//   end.setDate(end.getDate() + week * 7);
//   console.log(start, end);
//   return dateFilter(start, end);
// };
// const weekly = filterByWeek();

function App() {
  const [open, setOpen] = React.useState(false);

  const [item, setItem] = useState();
  const dataset = item ? pick(data[0], [item]) : data[0];
  const items = Object.keys(dataset);
  const sel_item = data[0][item];
  const assignees = sel_item && Object.keys(sel_item);
  const delivered = assignees?.map((x) => data[0][item][x].delivered[0]);
  const assigned = assignees?.map((x) => data[0][item][x].assigned[0]);
  const total_assigned = assigned?.reduce((acc, x) => acc + x, 0);
  const total_delivered = delivered?.reduce((acc, x) => acc + x, 0);
  console.log({ total_assigned });
  const handleItemsChange = (e) => {
    const { value } = e.target;
    const newValue = value === "All items" ? undefined : value;
    setItem(newValue);
  };
  const res1 = items.map((itemd) => {
    console.log(itemd);
    return (
      <table className="table_main" width="100%">
        <tr><caption>Item : {itemd} </caption></tr>
        <tr>
          <th> Assignee </th>
          <th> Assigned units </th>
          <th> Delivered units </th>
          <th> progress </th>
        </tr>
        {Object.keys(data[0][itemd]).map((assignee) => {
          const details = data[0][itemd][assignee];
          return (
            <tr>
              <td> {assignee} </td>
              <td> {details.total_assigned} </td>
              <td> {details.total_delivered} </td>
              <td>
                {" "}
                {percentDelivered(
                  details.total_assigned,
                  details.total_delivered
                )}
                %{" "}
              </td>
            </tr>
          );
        })}
        {item && (
          <tr style={{ backgroundColor: "grey !important" }}>
            <th style={{ backgroundColor: "grey !important" }}>Total </th>
            <th style={{ background: "grey !important" }}>
              {" "}
              {total_assigned}{" "}
            </th>
            <th style={{ background: "grey !important" }}>
              {" "}
              {total_delivered}{" "}
            </th>
            <th style={{ background: "grey !important" }}>
              {(total_delivered / total_assigned).toFixed(2) * 100} %
            </th>
          </tr>
        )}
      </table>
    );
  });

  const dataPoints = {
    labels: assignees,
    datasets: [
      {
        label: "# Delivered",
        data: delivered,
        backgroundColor: "#26A2ED"
      },
      {
        label: "# assigned",
        data: assigned,
        borderColor: "#000",
        borderwidth: 2,
        backgroundColor: "#41C572"
      }
    ]
  };
  return (
    <div className="App container mt-5 mb-5 ">
      <h1> Delivery report </h1>

      <div className="container col-12 row mt-5 mb-5">
        <div className="col-4">
          <select
            name="cars"
            id="cars"
            className="pt-2 pb-2 pr-3 pl-3"
            onChange={handleItemsChange}
          >
            <option value={undefined}>All items </option>
            {allKeys.map((k) => (
              <option value={k}>{k}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row col-12 justify-content-end">
        <div className="col-6"> </div>

        <div className="col-1 ">
          <Button onClick={() => DownloadAction("download")}>
            {" "}
            <CloudDownloadIcon fontSize="large" />{" "}
          </Button>
        </div>
      </div>
      <div id="download">
        {res1}
        {item && <Bar data={dataPoints} options={options} />}
      </div>
    </div>
  );
}

export default App;
