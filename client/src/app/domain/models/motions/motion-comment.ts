import { Id } from '../../definitions/key-types';
import { HasMeetingId } from '../../interfaces/has-meeting-id';
import { BaseModel } from '../base/base-model';

export class MotionComment extends BaseModel<MotionComment> {
    public static COLLECTION = `motion_comment`;

    public comment!: string;

    public motion_id!: Id; // motion/comment_ids;
    public section_id!: Id; // motion_comment_section/comment_ids;

    public constructor(input?: any) {
        super(MotionComment.COLLECTION, input);
    }
}
export interface MotionComment extends HasMeetingId {}
