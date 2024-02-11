interface IWeather {
    name: string,
    weather: [
        {
            main: string,
            icon: string,
        }
    ],
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
    },
    wind: {
        speed: number,
    },
}

interface IFiveDays {
    list: {
        main: {
          temp: number
          feels_like: number
          temp_min: number
          temp_max: number
        },
        weather: [
          {
            main: string
            icon: string
            description: string
          }
        ],
        wind: {
          speed: number
        },
        dt_txt: string
      }[],
  }
          
      
