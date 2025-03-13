export interface Region {
  regionId: number;
  region: string;
}

export interface BusinessItem {
  businessId: number;
  pic: string;
  title: string;
  price: number;
  businessName: string;
  scoreAvg: number;
  serviceCount: number;
}

export type WeatherItem = {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
};

export type WeatherMapItem = {
  tempSum: number;
  count: number;
  weatherDescription: string;
  iconCode: string;
};

export type WeatherDisplayItem = {
  date: string;
  averageTemp: string;
  iconUrl: string;
  description: string;
};
