import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import VideoOffIcon from '../../../icons/VideoOffIcon';
import VideoOnIcon from '../../../icons/VideoOnIcon';

export default function ToggleCaptionButton(props: { disabled?: boolean; className?: string }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const onToggle = () => setIsEnabled(!isEnabled);

  return (
    <Button
      className={props.className}
      disabled={props.disabled}
      onClick={onToggle}
      startIcon={!isEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
    >
      {isEnabled ? 'Stop Live Captions' : 'Enable Live Captions'}
    </Button>
  );
}
