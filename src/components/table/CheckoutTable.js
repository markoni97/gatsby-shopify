import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: '5rem',
  },
}));

const CheckoutTable = (props) => {
  const styles = useStyles();

  const headings = props.headings.map((heading) => {
    return (
      <TableCell align="center" key={heading.title} colSpan={heading.span}>
        {heading.title}
      </TableCell>
    );
  });

  return (
    <TableContainer className={styles.table} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>{headings}</TableRow>
        </TableHead>
        <TableBody>{props.children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CheckoutTable;
