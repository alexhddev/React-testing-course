import { ShoppingList1 } from "./components/4Errors/ShoppingList1";
import { ShoppingList2 } from "./components/4Errors/ShoppingList2";

function App() {

  const ingredients = ['Apples', 'Bananas', 'Ham', 'Bread', 'Bread']

  const someFunction = (selectedItem: string) => { 
    console.log(`Selected ${selectedItem}`)
  }

  return (
    <>
      <h2>Shopping list 1:</h2>
      {/* <ShoppingList1
        groceries={ingredients}
        selectItem={someFunction}
      /> */}
      <h2>Shopping list 2:</h2>
      <ShoppingList2
        groceries={ingredients}
        selectItem={someFunction}
      />
    </>
  )
}

export default App
