import React from 'react';

const styles = {
  paddingTop: '1.5625rem',
  paddingBottom: '1.5625rem',
  width: '98%',
  minWidth: '21.875rem',
  margin: '0 auto',
  color: 'rgb(114, 114, 114)',
};
const Layout = props => {
  console.count('LAYOUT');
  return <div style={styles}>{props.children}</div>;
};

export default Layout;
