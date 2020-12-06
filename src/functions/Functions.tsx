
interface ComicItems {
    comicName:string,
    comicUrl:string
}
export const createItemsArray = (apiItems:[]):ComicItems[] =>{
    const items:ComicItems[] = [];

    apiItems.forEach((element:any) =>{
        items.push({
            comicName: element.name,
            comicUrl: element.resourceURI
        });
    });

    return items;

}