import { Schema, model, Document } from 'mongoose';

interface IReaction {
    reactionId: string; 
    reactionBody: string;
    username: string;
    createdAt: Date;
}

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: IReaction[];
    reactionCount: number;
}

const reactionSchema = new Schema<IReaction>({
    reactionId: { type: String, default: () => new Date().toISOString() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const thoughtSchema = new Schema<IThought>({
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [reactionSchema],
}, {
    toJSON: { virtuals: true },
    id: false,
});


thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

export default model<IThought>('Thought', thoughtSchema);
