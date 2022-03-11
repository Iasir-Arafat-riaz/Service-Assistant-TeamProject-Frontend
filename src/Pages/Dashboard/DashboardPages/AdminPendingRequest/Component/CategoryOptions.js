import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CategoryOptions(props) {
  const {serviceCategory} = props;



  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Service Category</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value='ServiceCategory'
          label="serviceCategory"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
              serviceCategory.map(item => <MenuItem key={item._id} value={item._id}>{`${item.Category}`}</MenuItem>)
          }
        </Select>
      </FormControl>
      </div>
  )
}