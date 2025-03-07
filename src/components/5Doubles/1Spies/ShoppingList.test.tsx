import { render, screen, within } from "@testing-library/react"
import { ShoppingList } from "./ShoppingList"
import userEvent from "@testing-library/user-event"
import * as Utils from './Utils'


describe('Shopping list test suite', () => {
    const ingredients = ['milk', 'onions', 'ham']

    it('should select ingredients - local spy', async () => {
        const someFunction = (item: string) => {
            console.log(`Selected item ${item}`)
        }

        const someFunctionWrapper = {
            function: someFunction
        }

        const someFunctionSpy = vi.spyOn(someFunctionWrapper, 'function')

        render(<ShoppingList
            groceries={ingredients}
            selectItem={someFunctionWrapper.function}
        />)
        const user = userEvent.setup();

        const shoppingList = screen.getByRole('list')
        expect(shoppingList).toBeInTheDocument();
        const ingredientItems = within(shoppingList).getAllByRole('listitem');
        expect(ingredientItems).toHaveLength(3)
        const milkIngredient = ingredientItems[0];
        await user.click(milkIngredient)
        expect(someFunctionSpy).toHaveBeenCalledOnce()
        expect(someFunctionSpy).toHaveBeenCalledWith('milk')
    })

    it('should select ingredients - external spy', async () => {

        const onItemSelectSpy = vi.spyOn(Utils, 'onItemSelect')

        render(<ShoppingList
            groceries={ingredients}
            selectItem={Utils.onItemSelect}
        />)
        const user = userEvent.setup();

        const shoppingList = screen.getByRole('list')
        expect(shoppingList).toBeInTheDocument();
        const ingredientItems = within(shoppingList).getAllByRole('listitem');
        expect(ingredientItems).toHaveLength(3)
        const milkIngredient = ingredientItems[0];
        await user.click(milkIngredient)
        expect(onItemSelectSpy).toHaveBeenCalledOnce()
        expect(onItemSelectSpy).toHaveBeenCalledWith('milk')
    })

    it('should select ingredients - external spy and Date spy', async () => {
        const onItemSelectSpy = vi.spyOn(Utils, 'onItemSelectWithTime')
        const dateSpy = vi.spyOn(Date, 'now')
        render(<ShoppingList
            groceries={ingredients}
            selectItem={Utils.onItemSelectWithTime}
        />)
        const user = userEvent.setup();

        const shoppingList = screen.getByRole('list')
        const ingredientItems = within(shoppingList).getAllByRole('listitem');
        const milkIngredient = ingredientItems[0];
        await user.click(milkIngredient)
        expect(onItemSelectSpy).toHaveBeenCalledWith(ingredients[0])
        expect(onItemSelectSpy).toHaveBeenCalledTimes(1);
        expect(dateSpy).toHaveBeenCalled()
    })

    it('should select ingredients - mock - easiest way', async () => {
        const selectItemMock = vi.fn();
        render(<ShoppingList
            groceries={ingredients}
            selectItem={selectItemMock}
        />)
        const user = userEvent.setup();

        const shoppingList = screen.getByRole('list')
        const ingredientItems = within(shoppingList).getAllByRole('listitem');
        const milkIngredient = ingredientItems[0];
        await user.click(milkIngredient)
        expect(selectItemMock).toHaveBeenCalledWith(ingredients[0])
        expect(selectItemMock).toHaveBeenCalledTimes(1);
    })


})