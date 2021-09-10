import React from 'react';
import Button from '@material-ui/core/Button';
import useCaptionContext from '../../../hooks/useCaptionContext/useCaptionContext';

export default function ToggleCaptionButton(props: { disabled?: boolean; className?: string }) {
  const { isCaptionWindowOpen: isCaptionOpen, toggleCaptionWindow: toggleCaption } = useCaptionContext();

  return (
    <Button className={props.className} disabled={props.disabled} onClick={toggleCaption}>
      {isCaptionOpen ? 'Stop Live Captions' : 'Enable Live Captions'}
    </Button>
  );
}
