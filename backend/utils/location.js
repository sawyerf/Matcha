import geoip from 'geoip-lite';

export const locationByIp = (ip) =>  {
    const geo = geoip.lookup(ip);
    console.log('geo:', geo.ll);
    return (geo.ll);
}

export const distance = (loca1, loca2) => {
    const R = 6371e3; // metres
    const φ1 = loca1[0] * Math.PI/180; // φ, λ in radians
    const φ2 = loca2[0] * Math.PI/180;
    const Δφ = (loca2[0]-loca1[0]) * Math.PI/180;
    const Δλ = (loca2[1]-loca1[1]) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = ((R * c) / 1000) | 0; // in metres
    console.log('distance: ', d, 'km')
    return (d);
}