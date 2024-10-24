const { tavily } = require("@tavily/core");

const APIKEY = process.env.TAVAPI;
const tvly = tavily({ apiKey: APIKEY });
interface queryInterf {    
    query: string
}
export async function getDataFromWebsites(
    { query }: queryInterf
) {
   return(await tvly.searchContext(query)); 
}
