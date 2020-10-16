import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import ContentBlock from './ContentBlock';

const styles = theme => ({
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    components: any[];
}

const PageSlot: React.SFC<Props> = (props) => {
    const {
        classes,
        components = [],
        ...other
    } = props;

    return (
        <>
            {
                components.map(component => {
                    return <ContentBlock data={component} />;
                })
            }
        </>
    );
};

export default withStyles(styles)(PageSlot);