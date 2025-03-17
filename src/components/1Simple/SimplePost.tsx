export function SimplePost(props: {
    content: string,
    user: string,
    likesBy?: string[]
}) {
    function renderLikes() {
        if (props.likesBy) {
            return <div data-testid="likes-container">
                <h3>Likes by:</h3>
                <ul>
                    {
                        props.likesBy.map(like => {
                            return <li key={like}>{like}</li>
                        })
                    }
                </ul>
            </div>
        }
    }

    return <div data-testid="post-container">
        <h2>{props.user}:</h2>
        <p>{props.content}</p>
        {renderLikes()}
    </div>

}