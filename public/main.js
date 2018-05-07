import { weatherPost } from './weatherdata.js';
import { weatherhtml } from './weatherhtml.js';
import { weatherApi } from './weatherapi.js';

class weatherController {

    constructor() {
        this.watherData = new weatherPost();
        this.weatherHtml = new weatherhtml();
        this.weatherApi = new weatherApi();
    }

    startWeatherChat() {
        this.Html.renderWeatherPost(this.Data.weatherPostArrey)

        $('.search-button').click(()  => {
            let cityName = this.weatherHtml.findCityInDom();
            this.weatherApi.findTemp(cityName).then( (weatherOBJ) => {
                this.weatherData.addWeatherPost(weatherOBJ);
                this.weatherHtml.renderWeatherPost(this.weatherData.weatherPostArrey);
            })
                .catch(function (jqXHR, textStatus, errorThrown) {
                    console.log(textStatus);
                })
        });

        $('.clear-posts').click( () => {
            localStorage.removeItem(this.weatherData.STORAGE_ID) // data should handle local storage
            this.weatherHtml.renderWeatherPost(this.weatherData.weatherPostArrey)
        })

        $('.weather-posts').on('click', '.comment-button',  () => {
            let commentData = this.weatherHtml.getCommentFromDom(this);
            this.weatherData.addWeatherComment(commentData);
            this.weatherHtml.renderWeatherPost(this.weatherData.weatherPostArrey);
        })

    }
}

var weatherChat = new weatherController();
weatherChat.startWeatherChat();






