import { render} from "@testing-library/react"
import { ShoppingList1 } from "./ShoppingList1"

describe('Shopping1 list test suite', () => {

    it('Throw error on list duplicates', ()=>{
        const groceriesWithDuplicates = ['Onions', 'Ham', 'Ham']
        expect(()=>{
            render(<ShoppingList1
                groceries={groceriesWithDuplicates}
                selectItem={()=>{}}
            />)  
        }).toThrow('Duplicate items found in groceries array')          
    })

    it('Throw error on list duplicates - generic message', ()=>{
        const groceriesWithDuplicates = ['Onions', 'Ham', 'Ham']
        expect(()=>{
            render(<ShoppingList1
                groceries={groceriesWithDuplicates}
                selectItem={()=>{}}
            />)  
        }).toThrow(/Duplicate/)          
    })
});