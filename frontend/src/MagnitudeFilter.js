import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';

const MagnitudeFilter = ({ options, setUrlFilter, urlFilter }) => {

  const handleSelectChange = (e) => {
    if (e.target.value === '') {
      setUrlFilter({ ...urlFilter, 'mag_type[]':[]})
    }
    else {
      const types_list = e.target.value.split(',').map(item => item.trim())
      setUrlFilter({...urlFilter, 'mag_type[]': types_list});
    }
  }
  
  return (
      <Select
        placeholder={<strong>Tipo de magnitud</strong>}
        selectionMode='multiple'
        scrollShadowProps={{
          isEnabled: false
        }}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>      
  );
};

export default MagnitudeFilter;
