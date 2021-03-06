declare module 'iplocation' {
  interface IpLocation {
    ip: string;
    country_code: string;
    country_name: string;
    region_code: string;
    region_name: string;
    city: string;
    zip_code: string;
    time_zone: string;
    latitude: number;
    longitude: number;
    metro_code: number;
  }

  const x: (ipAddress?: string) => Promise<IpLocation>;
  export = x;
}
