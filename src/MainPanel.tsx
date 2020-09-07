import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions } from 'types';
import { ResponsiveLine } from '@nivo/line';
import { processData } from './util/helpFunc';
import { FieldBuffer, Line_id } from './types';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  data: Array<{ id: string; data: Array<{ x: string; y: number | null }> }> | null;
}

export class MainPanel extends PureComponent<Props, State> {
  state = {
    data: [],
  };

  componentDidMount() {
    const { bus_line } = this.props.options;
    if (this.props.data.series.length > 0) {
      const fields = this.props.data.series[0].fields as FieldBuffer[];

      const data = processData(fields, bus_line as Line_id);
      this.setState({ data: data });
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.data.series[0] !== this.props.data.series[0] ||
      prevProps.options.bus_line !== this.props.options.bus_line
    ) {
      const fields = this.props.data.series[0].fields as FieldBuffer[];
      const { bus_line } = this.props.options;
      const data = processData(fields, bus_line as Line_id);
      this.setState({ data: data });
    }
  }

  render() {
    const { width, height } = this.props;
    const { data } = this.state;

    if (data.length == 0) {
      return <div>No Data</div>;
    }

    return (
      <div
        style={{
          width,
          height,
          padding: 10,
        }}
      >
        <ResponsiveLine
          margin={{ top: 50, right: 100, bottom: 100, left: 60 }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 47,
          }}
          data={data}
          yScale={{
            type: 'linear',
            stacked: false,
          }}
        />
      </div>
    );
  }
}
