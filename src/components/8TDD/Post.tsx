import { useState, useEffect } from "react";
import { Comment } from "./Model";
import { getCommentsForPost, postComment } from "./DataService";

let nextId = 0;

export function Post(props: {
    content: string,
    user: string,
    id: string
}) {

    const [comment, setComment] = useState('')
    const [comments, setComments] = useState<Comment[]>([])

    useEffect(()=>{
        const fetchComments = async ()=>{
            const comments = await getCommentsForPost(props.id)
            sortCommentsByDate(comments)
            setComments(comments)
        }
        fetchComments();
    }, [])

    return <div>
        <div data-testid="post-container">
            <h2>{props.user}:</h2>
            <p>{props.content}</p>
        </div>
        <div data-testid="comment-container">
            <input
                data-testid="comment-input"
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
            <button
                onClick={() => {
                    const now = new Date().getTime()
                    comments.push({
                        content: comment,
                        date: now
                    })
                    postComment(
                        props.id,
                        comment,
                        now
                    )
                    setComment('')
                }}
            >Comment</button>
            <div data-testid="post-comment-container">
                {
                    comments.map(comment => {
                        return <p key={nextId++}>{comment.content}</p>
                    })
                }
            </div>

        </div>

    </div>

}

function sortCommentsByDate(comments: Comment[]){
    // sort comments by date: newest first
    comments.sort((a, b) => b.date - a.date)
}