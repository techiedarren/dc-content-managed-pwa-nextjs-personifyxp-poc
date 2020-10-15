import { UserProfileState } from "../components/UserProfile";
import { NextPageContext } from "next";

export async function fetchUserProfile(context: NextPageContext): Promise<UserProfileState> {
    const {
        pxp_behaviors  = '',
        pxp_tags = ''
    } = context.query as any || {};

    return {
        targetingBehaviors: pxp_behaviors.split(','),
        targetingTags: pxp_tags.split(',')
    }
}