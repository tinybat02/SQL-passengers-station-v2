import React, { useState } from 'react';
// import { FormField } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import { PanelOptionsGroup } from '@grafana/ui';

import { PanelOptions } from './types';

export const MainEditor: React.FC<PanelEditorProps<PanelOptions>> = ({ options, onOptionsChange }) => {
  const [line_id, setLine] = useState(options.bus_line);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setLine(value);
  };

  const handleSubmit = () => {
    onOptionsChange({ bus_line: line_id });
  };

  return (
    <PanelOptionsGroup>
      <div className="editor-row">
        <div className="section gf-form-group">
          <h5 className="section-heading">Set Traffic Line</h5>
          <select id="selector" style={{ width: 350 }} onChange={handleChange} value={line_id}>
            <option value="n211_toward">211 Towards</option>
            <option value="n211_backward">211 Backwards</option>
            <option value="n212_toward">212 Towards</option>
            <option value="n212_backward">212 Backwards</option>
            <option value="n244_toward">244 Towards</option>
            <option value="n244_backward">244 Backwards</option>
            <option value="n232">232</option>
          </select>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </PanelOptionsGroup>
  );
};
