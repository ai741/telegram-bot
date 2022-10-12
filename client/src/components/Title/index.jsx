import React from 'react';

import styles from './Title.module.scss';
import Container from '@mui/material/Container';

export const Title = ({value}) => {
  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <h1>{value}</h1>
      </Container>
    </div>
  );
};
