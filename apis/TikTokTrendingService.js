'use strict'

const request = require('request');

class TikTokTrends {
  
  constructor(item) {

    if (item.video !== undefined && item.video.playAddr !== undefined) {
      this.video = item.video
    } 
    if (item.desc !== undefined) {
      this.desc = item.desc
    }
  }
}

class TikTokTrendingService {

  async fetchTrends(completion) {
    
    const sourcesType = [3,9,12]
    const random = Math.floor(Math.random() * sourcesType.length);

    const trendingURL = "https://m.tiktok.com/api/item_list/?count=50&id=1&type=5&secUid=&maxCursor=1&minCursor=0&sourceType=" + random + "&appId=1233"
 
    const options = {
      url: trendingURL,
      headers: {
        "method": "GET",
        'Content-Type': 'application/json',
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
      }
    };
    
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
      const info = JSON.parse(body)

      let items = info.items
      var tikTokTrends = [];
      if (items !== undefined && items.length > 0) {
        for (let element of items) {
          tikTokTrends.push(new TikTokTrends(element));
       }
    } 
      
      completion(tikTokTrends)
      } else {
        console.error('error:', error);
      }
    }
    request(options, callback);
  }
}

module.exports = {
  TikTokTrendingService,
  TikTokTrends
};