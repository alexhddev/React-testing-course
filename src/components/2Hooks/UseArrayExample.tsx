import { useArray } from "./UseArray"

export default function UseArrayExample() {
  const { array, set, push, remove, filter, update, clear } = useArray([
    1, 2, 3, 4, 5, 6,
  ])

  return (
    <div>
      <div>{array.join(", ")}</div>
      <button onClick={() => push(5)}>Add 5</button><br/>
      <button onClick={() => update(1, 8)}>Change Second Element To 8</button><br/>
      <button onClick={() => remove(1)}>Remove Second Element</button><br/>
      <button onClick={() => filter(n => n < 3)}>
        Keep Numbers Less Than 3
      </button><br/>
      <button onClick={() => set([1, 2, 3])}>Set To 1, 2,3</button><br/>
      <button onClick={clear}>Clear</button><br/>
    </div>
  )
}
