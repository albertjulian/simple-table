import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import { Button, MenuItem } from '@material-ui/core';

interface Params {
  keyword?: string;
  gender?: string;
}

interface PropTypes {
  callback: (params: Params) => void,
}

const useStyles = makeStyles((theme) => ({
  gridStyleButton: {
    padding: '10px 10px 10px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridStyle: {
    padding: '10px 10px 10px 20px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  textField: {
    marginTop: 10,
  },
}));

const Search: React.FC<PropTypes> = (
  props: PropTypes,
) => {
  const classes = useStyles();
  const { callback } = props;
  const [keyword, setKeyword] = useState('');
  const [gender, setGender] = useState('all');

  const handleChange = (e: any, stringSet: string) => {
    if (stringSet === 'keyword') {
      setKeyword(e.target.value);
    } else if (stringSet === 'gender') {
      setGender(e.target.value);
    }
  }

  const handleMouseDown = (event: any) => {
    event.preventDefault();
  };

  const handleSearch = (e: any, callback: (params: Params) => void) => {
    e.preventDefault();

    callback({
      keyword,
      gender
    });
  }

  const handleReset = (e: any, callback: (params: Params) => void) => {
    e.preventDefault();
    setKeyword('');
    setGender('all');

    callback({
      keyword: '',
      gender: 'all',
    });
  }

  return (
    <Grid container>
      <Grid item xs={4} className={classes.gridStyle}>
        <FormControl className={classes.textField} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment">Search</InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            type="text"
            value={keyword}
            onChange={(e) => handleChange(e, 'keyword')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={(e) => handleSearch(e, callback)}
                  onMouseDown={handleMouseDown}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
      </Grid>

      <Grid item xs={2} className={classes.gridStyle}>
        <FormControl variant="outlined" className={classes.formControl} fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={gender}
            label="Gender"
            onChange={(e) => handleChange(e, 'gender')}
          >
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="all">All</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={2} className={classes.gridStyleButton}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={(e) => handleReset(e, callback)}
          fullWidth
        >
          Reset Filter
        </Button>
      </Grid>
    </Grid>
  );
}

export default Search;
