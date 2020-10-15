import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core';

import EditorialBlock from './EditorialBlock';
import HeroBannerBlock from './HeroBannerBlock';
import GalleryBlock from './GalleryBlock';
import TargetedContent from './TargetedContent';

const styles = theme => ({
});

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    data: {
        component: string;
        [key:string]: any;
    }
}

const ContentBlock: React.SFC<Props> = (props) => {
    const {
        classes,
        data,
        ...other
    } = props;

    const {
        component
    } = data;

    let ComponentType = null;

    switch (component) {
        case 'HeroBannerBlock':
            ComponentType = HeroBannerBlock;
            break;
        case 'EditorialBlock':
            ComponentType = EditorialBlock;
            break;
        case 'GalleryBlock':
            ComponentType = GalleryBlock;
            break;
        case 'TargetedContent':
            ComponentType = TargetedContent;
            break;
    }
    
    if (!ComponentType) {
        return;
    }

    return <ComponentType {...data} />;
};

export default withStyles(styles)(ContentBlock);