import React from "react";
import App from "./App";
import DateReport from './DateReport'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import "./styles.css";

export default function Home() {
  const [view, setView] = React.useState('item');

  const handleChangeView = (event) => {
    setView(event.target.value);
  };
return (
  <>
<div className="topControl" >
    <FormControl component="fieldset">
      <Typography variant="h6">Filter Item delivery Report using</Typography>
      <RadioGroup className="control"  value={view} onChange={handleChangeView}>
        <FormControlLabel value="item" control={<Radio />} label="Item" />
        <FormControlLabel value="date" control={<Radio />} label="week" />
      </RadioGroup>
    </FormControl>

</div>
<Container maxWidth="sm">
{view === 'date' ? <DateReport />: <App/>}
</Container>
</>
)
}