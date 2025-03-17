import { render, screen, within } from "@testing-library/react"
import { SimplePost } from "./SimplePost"


describe('SimplePost test suite', ()=>{
    it('should be rendered in the document - no likes', ()=>{
        const someUserName = 'Alex';
        const someContent = 'Some content'
        render(<SimplePost
            user={someUserName}
            content={someContent}
        />)
        // screen.debug();

        const postContainer = screen.getByTestId('post-container')
        expect(postContainer).toBeInTheDocument()

        const user = screen.getByRole('heading')
        expect(user).toBeInTheDocument()
        expect(user).toHaveTextContent(someUserName)

        const postContent = screen.getByRole('paragraph')
        expect(postContent).toBeInTheDocument();
        expect(postContent).toHaveTextContent(someContent)

        const likesList = screen.queryByRole('list')
        expect(likesList).not.toBeInTheDocument();
    })

    it('should be rendered in the document - with likes', ()=>{
        const someUserName = 'Alex';
        const someContent = 'Some content'
        const someLikes = ['Alex', 'Mary']
        render(<SimplePost
            user={someUserName}
            content={someContent}
            likesBy={someLikes}
        />)
        // screen.debug();

        const likesContainer = screen.getByTestId('likes-container');
        const likes = within(likesContainer).getAllByRole('listitem')
        expect(likes).toHaveLength(2)
        expect(likes[0]).toHaveTextContent('Alex')
        expect(likes[1]).toHaveTextContent('Mary')
    })

})