export async function onItemSelect(item: string){
    console.log(`Selected item ${item}`)
}

export async function onItemSelectWithTime(item: string){
    console.log(`Selected item ${item} at ${Date.now()}`)
}