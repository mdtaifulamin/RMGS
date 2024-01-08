import axios from "axios";
import News_head from "./News";

const main_server = 'https://firsttrial-cff1d-default-rtdb.firebaseio.com'
export const news_data = []
export const NewsValue = []

export async function FetchData(){
  const response = await axios.get(main_server + "/SquareNews.json")

  const news_data = []

  for (const key in response.data){
      const news_obj = {
          id: key,
          News: response.data[key].News,
          dept: response.data[key].dept,
          image: response.data[key].image,
          serial: response.data[key].serial,
      }
      news_data.push(news_obj)
  }

  for (const item in news_data){
    NewsValue.push(
      new News_head(
        news_data[item].image,
        news_data[item].serial,
        news_data[item].dept,
        news_data[item].News.replace(/\\n/g,"\n"),
      ),
    )
  }

/////////////////////// Applicable for V-1.5.0 /////////////////////////

//   NewsValue.push(
//     new News_head(
//       news_data[0].image,
//       news_data[0].serial,
//       news_data[0].dept,
//       news_data[0].News.replace(/\\n/g,"\n"),
//       ),
//     new News_head(
//       news_data[1].image,
//       news_data[1].serial,
//       news_data[1].dept,
//       news_data[1].News.replace(/\\n/g,"\n"),
//     ),
//     new News_head(
//       news_data[2].image,
//       news_data[2].serial,
//       news_data[2].dept,
//       news_data[2].News.replace(/\\n/g,"\n"),
//     ),
//     new News_head(
//       news_data[3].image,
//       news_data[3].serial,
//       news_data[3].dept,
//       news_data[3].News.replace(/\\n/g,"\n"),
//     ),
//     new News_head(
//       news_data[4].image,
//       news_data[4].serial,
//       news_data[4].dept,
//       news_data[4].News.replace(/\\n/g,"\n"),
//     )
//   )
}

FetchData()