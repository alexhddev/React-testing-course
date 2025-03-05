import { SimplePost } from "./components/1Simple/SimplePost";

function App() {
  

  return (
    <>
     <SimplePost
      content="The sky is blue"
      user="Alex"
      likesBy={['John', 'Mary']}
     />
    </>
  )
}

export default App
