import { Post } from "./Post"
import { render, screen, within, act } from "@testing-library/react"
import * as DataService from './DataService'
import userEvent from "@testing-library/user-event"

describe('Post tests with mocks', () => {

    afterEach(() => {
        jest.useRealTimers()
    })

    it('should load initial comments', async () => {

        const getCommentsForPostSpy = jest.spyOn(DataService, 'getCommentsForPost')
        const now = new Date().getTime()
        getCommentsForPostSpy.mockResolvedValueOnce([{
            content: 'Cool1',
            date: now
        },
        {
            content: 'Cool2',
            date: now + 2000
        }])

        await act(async () => {
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


    it.skip('should invoke backend when posting comment - not working with jest', async () => {
        const postCommentSpy = jest.spyOn(DataService, 'postComment');

        const dateNowNumber = 1600000000000;
        jest.useFakeTimers({ advanceTimers: true })
            .setSystemTime(1600000000000)

        await act(async () => {
            render(<Post
                content="Hello"
                id="123"
                user="Alex"
            />)
        })

        const user = userEvent.setup({ delay: null });
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