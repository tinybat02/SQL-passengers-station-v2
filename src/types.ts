import { DataFrame, Field, Vector } from '@grafana/data';

export interface PanelOptions {
  bus_line: string;
}

export const defaults: PanelOptions = {
  bus_line: 'n211_backward',
};

export interface Buffer extends Vector {
  buffer: any;
}

export interface FieldBuffer extends Field<any, Vector> {
  values: Buffer;
}

export interface Frame extends DataFrame {
  fields: FieldBuffer[];
}

export type Line_id = 'n211_toward' | 'n211_backward' | 'n212_toward' | 'n212_backward';
