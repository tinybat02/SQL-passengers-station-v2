import { FieldBuffer, Line_id } from '../types';
import { station_list } from '../constants/stations';

export const processData = (rawData: FieldBuffer[], bus_line: Line_id) => {
  const hash = rawData[0].values.buffer;
  const start_station = rawData[1].values.buffer;
  const end_station = rawData[2].values.buffer;

  const bus_stations = station_list[bus_line] || [];
  const data = [];
  for (let i = 0; i < hash.length; i++) {
    const obj: { id: string; data: Array<{ x: string; y: number | null }> } = { id: '#' + i, data: [] };
    const start_Idx = bus_stations.indexOf(start_station[i]);
    const end_Idx = bus_stations.indexOf(end_station[i]);

    obj.data = bus_stations.map((station, index) => {
      const station_name = station.split(',').length == 2 ? station.split(',')[1] : station.split(',')[0];
      if (index >= start_Idx && index <= end_Idx) {
        return {
          x: station_name,
          y: i + 1,
        };
      } else {
        return {
          x: station_name,
          y: null,
        };
      }
    });

    data.push(obj);
  }

  return data;
};
