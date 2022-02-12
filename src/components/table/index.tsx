import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import getUserData from '../../services/user';
import EnhancedTable from './table';

interface PropTypes {
  trigger: boolean;
  params: any;
  callback: (params: any) => void;
}

const TableComponent: React.FC<PropTypes> = (
  props: PropTypes,
) => {
  const {
    trigger,
    params,
    callback,
  } = props;
  const [data, setData] = useState([]);

  const getUserDataFunction = () => {
    try {
      getUserData(params).then((response: any) => {
        const newResponse = response && response.map((row: any) => {
          return {
            username: row.login && row.login.username,
            name: `${row.name && row.name.first} ${row.name && row.name.last}`,
            gender: row.gender,
            email: row.email,
            registered_date: row.registered && row.registered.date && dayjs(row.registered.date).format('DD-MM-YYYY HH:mm'),
          }
        })
        setData(newResponse);
      });
    } catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    const ac = new AbortController();

    getUserDataFunction()

    return () => ac.abort();
  }, [trigger]);

  return (
    <EnhancedTable data={data} callback={callback} />
  );
}

export default React.memo(TableComponent);