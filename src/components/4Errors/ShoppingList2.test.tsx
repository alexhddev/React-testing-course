import { render, screen} from "@testing-library/react"
import { ShoppingList2 } from "./ShoppingList2"

describe('Shopping2 list test suite', () => {
    it('Show error message on list duplicates', ()=>{
        const groceriesWithDuplicates = ['Onions', 'Ham', 'Ham']
            render(<ShoppingList2
                groceries={groceriesWithDuplicates}
                selectItem={()=>{}}
            />) 
            const errorMessage = screen.getByRole('paragraph')  
            expect(errorMessage).toHaveTextContent(/duplicate/)      
    })
});