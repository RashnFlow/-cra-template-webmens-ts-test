import React from 'react';
import { IAddFieldInput } from '../../types';
import { AddFieldLabel } from '../../styles';

export function AddFieldInput({ children, onChange, checked }: IAddFieldInput) {
  return (
    <AddFieldLabel>
      <input type="checkbox" onChange={onChange} checked={checked} />
      {children}
    </AddFieldLabel>
  );
}
