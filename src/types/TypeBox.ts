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
  logo?: string;
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

export interface StealReview {
  name: string;
  score: number;
  contents: string;
  createdAt: string;
  pic: string;
}

export interface UserReport {
  title: string;
  reason: string;
  contents: string;
  createdAt: string;
  qaType: string;
  qaId: number;
  pics: string[];
}

export interface Answer {
  contents: string;
  createdAt: string;
  qaId: number;
  answer: string;
}
