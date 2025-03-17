import { Post } from "./Post"
import { render, screen, within, act } from "@testing-library/react"
import * as DataService from  './DataService'
import userEvent from "@testing-library/user-event"

describe('Post tests with mocks', () => {

    afterEach(()=>{
        vi.useRealTimers()
    })

    it('should load initial comments',async () => {

        const getCommentsForPostSpy = vi.spyOn(DataService, 'getCommentsForPost')
        const now = new Date().getTime()
        getCommentsForPostSpy.mockResolvedValueOnce([{
            content: 'Cool1',
            date: now
        },
        {
            content: 'Cool2',
            date: now + 2000
        }])

        await act(async ()=>{
            render(<Post
                content="Hello"
                id="123"
                user="Alex"
            />)
        })

        const commentsContainer = screen.getByTestId('post-comment-container')
        const comments = within(commentsContainer).getAllByRole('paragraph')
        expect(comments.length).toBe(2)
        expect(comments[0]).toHaveTextContent('Cool2')
        expect(comments[1]).toHaveTextContent('Cool1')

        expect(getCommentsForPostSpy).toHaveBeenCalledTimes(1);
        expect(getCommentsForPostSpy).toHaveBeenCalledWith('123')
    })


    it('should invoke backend when posting comment', async () => {
        const postCommentSpy = vi.spyOn(DataService, 'postComment');

        const dateNowNumber = 1600000000000;
        vi.setSystemTime(1600000000000)

        await act(async ()=>{
            render(<Post
                content="Hello"
                id="123"
                user="Alex"
            />)
        })

        const user = userEvent.setup();
        const commentInput = screen.getByTestId('comment-input')
        const commentContent = 'You are awesome!'
        await user.type(commentInput, commentContent);

        const commentButton = screen.getByRole('button')
        await user.click(commentButton)

        expect(postCommentSpy).toHaveBeenCalledTimes(1);
        expect(postCommentSpy).toHaveBeenCalledWith(
            '123',
            commentContent,
            dateNowNumber
        )

    })

})