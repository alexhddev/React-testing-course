import { render, within } from "@testing-library/react";
import { PostWithComment } from "./PostWithComments";
import userEvent from '@testing-library/user-event'
import { screen } from "@testing-library/react"


describe('Post with comments test suite', ()=>{
    describe('User interaction', ()=>{

        const someUserName = 'Alex';
        const someContent = 'Some content'

        beforeEach(() => {
            render(<PostWithComment
                user={someUserName}
                content={someContent}
            />)
        })

        test('User can comment', async () => {
            const user = userEvent.setup();
            const commentInput = screen.getByTestId('comment-input')
            const commentContent = 'You are awesome!'
            await user.type(commentInput,commentContent);
            expect(commentInput).toHaveValue(commentContent)
        })

        test('Comment area is cleared on click', async () => {
            const user = userEvent.setup();
            const commentInput = screen.getByTestId('comment-input')
            const commentContent = 'You are awesome!'
            await user.type(commentInput,commentContent);
            
            const commentButton = screen.getByRole('button')
            await user.click(commentButton)

            expect(commentInput).toBeEmptyDOMElement();
        })

        test('Comment is added on screen', async () => {
            const user = userEvent.setup();
            const commentInput = screen.getByTestId('comment-input')
            const commentContent = 'You are awesome!'
            await user.type(commentInput,commentContent);
            
            const commentButton = screen.getByRole('button')
            await user.click(commentButton)

            const commentsContainer = screen.getByTestId('post-comment-container')
            const comments = within(commentsContainer).getAllByRole('paragraph')
            expect(comments.length).toBe(1)
            expect(comments[0]).toHaveTextContent(commentContent)
        })

        test('Multiple comments are added on screen', async () => {
            const comment1 = 'You are awesome!'
            const comment2 = 'Nice car!'

            const user = userEvent.setup();
            const commentInput = screen.getByTestId('comment-input')
            const commentButton = screen.getByRole('button')

            await user.type(commentInput, comment1)
            await user.click(commentButton)

            await user.type(commentInput, comment2)
            await user.click(commentButton)
            
            const commentsContainer = screen.getByTestId('post-comment-container')
            const comments = within(commentsContainer).getAllByRole('paragraph')
            expect(comments.length).toBe(2)
            expect(comments[0]).toHaveTextContent(comment1)
            expect(comments[1]).toHaveTextContent(comment2)
        })

    })
})