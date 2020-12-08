import axios from "axios";

export default axios.create({
    baseURL: 'http://gateway.marvel.com/v1/public'
});

export const getComicUrl : any=  async (url:string, apikey:string, ts:number, hash:string) =>{
    const {data} = await axios.get(url, {
        params : {
         apikey,
         ts,
         hash
        }
    });

    return data;
}


