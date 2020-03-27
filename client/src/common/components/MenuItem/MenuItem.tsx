import React from 'react';
import { withStyles, createStyles } from '@material-ui/styles';
import MUIMenuItem from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core';

export const MenuItem = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:hover': {
                backgroundColor: theme.palette.primary.light
            }
        },
        selected: {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: theme.palette.primary.contrastText
        }
    })
)(MUIMenuItem);

export default MenuItem;