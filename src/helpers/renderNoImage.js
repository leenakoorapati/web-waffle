import React from 'react';

export default function renderNoImage(name, isErrorOccured, setState) {

  return (
    <div className="no-avatar-container">{name.charAt(0)}</div>
  )
}