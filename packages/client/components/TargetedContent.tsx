import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import ContentBlock from './ContentBlock';
import { useUserProfile } from './UserProfile';

const styles = theme => ({
});

type TargetGroup = {
    criteria: PersonifyXPCriteria;
    components: any[];
};

type PersonifyXPCriteria = {
    behaviors: string[];
    tags: string[];
};

type Scored<T> = {
    item: T;
    score: number;
};

const BEHAVIOR_MATCH_SCORE = 1;
const TAg_MATCH_SCORE = 1;

interface Props extends WithStyles<typeof styles> {
    className?: string;
    style?: React.CSSProperties;
    groups: TargetGroup[];
}

const TargetedContent: React.SFC<Props> = (props) => {
    const {
        classes,
        groups = [],
        ...other
    } = props;

    const {
        targetingBehaviors = [],
        targetingTags = []
    } = useUserProfile() || {};

    const filteredAndScoredGroups: Scored<TargetGroup>[] = React.useMemo(() => {
        const scoredGroups = groups.map(group => {
            const {
                behaviors = [],
                tags = []
            } = group.criteria;

            const matchingBehaviors = behaviors.filter(behavior => targetingBehaviors.indexOf(behavior) !== -1);
            const matchingTags = tags.filter(tag => targetingTags.indexOf(tag) !== -1);

            const matchingBehaviorsScore = matchingBehaviors.length * BEHAVIOR_MATCH_SCORE;
            const matchingTagsScore = matchingTags.length * TAg_MATCH_SCORE;

            return {
                score: matchingBehaviorsScore + matchingTagsScore,
                item: group
            };
        });
        return scoredGroups
            .filter(x => x.score > 0)
            .sort((a, b) => b.score - a.score);
    }, [groups, targetingBehaviors, targetingTags]);

    const chosenTargetGroup: TargetGroup | null = filteredAndScoredGroups.length > 0 ? filteredAndScoredGroups[0].item : groups[0];

    if (!chosenTargetGroup) {
        return null;
    }

    return <>
        {
            chosenTargetGroup.components.map(component => {
                return <ContentBlock data={component} />;
            })
        }
    </>;
};

export default withStyles(styles)(TargetedContent);