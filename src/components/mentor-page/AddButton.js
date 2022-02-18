import React from 'react';
import { Button } from 'semantic-ui-react';

export default function AddButton({ onClick, style }) {
  return (
    <Button
      icon="add"
      circular
      size="big"
      color="green"
      onClick={onClick}
      style={{ ...style, boxShadow: '0 4px 4px #aaaaaa' }}
    />
  );
}
