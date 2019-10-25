import React from 'react';
import classes from './Layout.module.css';

const Layout = (props) => (
    <div className={classes.Layout}>
        <main className={classes.Content}>
            {props.children}
        </main>
    </div>
);

export default Layout;