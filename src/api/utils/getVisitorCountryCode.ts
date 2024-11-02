import {ipstack_api_key} from '../../config'

// https://ipstack.com/documentation

// https://ipstack.com/documentation#requester this will also detect the ip address of where the request is coming from
// This will work only from the client side

type IpstackIpLookupResponse = {
    
    ip: string;
    /**
     * @example ipv4
     */
    type: string;
    /**
     * @example 'NA'
     */
    continent_code: string;
    /**
     * @example North America
     */
    continent_name: string;
    /**
     * what I need
     * @example US
     **/
    country_code: string;
    /**
     * @example United States
     */
    country_name: string;
    /**
     * @example MA
     */
    region_code: string;
    /**
     * @example Massachusetts
     */
    region_name: string;
    city: string;
    zip: string;
    latitude: number;
    longitude: number;
    msa: string;
    dma: string;
    radius: null,
    ip_routing_type: string;
    connection_type: string;
    location: {
        geoname_id: number;
        capital: string;
        languages: {
            code: string;
            name:string;
            native: string;
            }[];
        country_flag: string;
        country_flag_emoji: string;
        country_flag_emoji_unicode:string;
        calling_code: string;
        is_eu: boolean;
    },
    time_zone: {
        id: string;
        current_time: string;
        gmt_offset: number;
        code: string;
        is_daylight_saving: boolean;
    },
    currency: {
        code: string;
        name: string;
        plural:string;
        symbol: string;
        symbol_native: string;
    },
    connection: {
        asn:  number;
        isp: string;
        sld: null,
        tld: null,
        carrier: string;
        home: boolean;
        organization_type: string;
        isic_code: string;
        naics_code: string;
    }
      
}
export async function getVisitorGeoLookup(){
    const params = new URLSearchParams({ access_key: ipstack_api_key});    
    const res = await fetch(`http://api.ipstack.com/check?${params.toString()}`);

    const data = await res.json() as IpstackIpLookupResponse;
    return data;
}

export async function getVisitorGeoLookupByIP(ipAddress:string){
    const params = new URLSearchParams({ access_key: ipstack_api_key});

    const res = await fetch(`https://api.ipstack.com/${ipAddress}?${params.toString()}`);
    const data = await res.json() as IpstackIpLookupResponse;

    return data;
}