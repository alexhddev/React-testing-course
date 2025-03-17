import { SimplePost } from './SimplePost'
import { render } from '@testing-library/react'

describe('Simple post snapshot tests', ()=>{
    it('initial test', ()=>{
        const rendered = render(
            <SimplePost 
                content='Simple content'
                user='Alex'                
            />
        )
        expect(rendered.asFragment()).toMatchSnapshot()
    })
})