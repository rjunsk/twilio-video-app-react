import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import CloseIcon from '../../../icons/CloseIcon';

import useCaptionContext from '../../../hooks/useCaptionContext/useCaptionContext';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: '56px',
      background: '#F4F4F6',
      borderBottom: '1px solid #E4E7E9',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 1em',
    },
    text: {
      fontWeight: 'bold',
    },
    closeChatWindow: {
      cursor: 'pointer',
      display: 'flex',
      background: 'transparent',
      border: '0',
      padding: '0.4em',
    },
  })
);

export default function CaptionWindowHeader() {
  const classes = useStyles();
  const { toggleCaptionWindow } = useCaptionContext();

  return (
    <div className={classes.container}>
      <div className={classes.text}>Live Transcription</div>
      <button className={classes.closeChatWindow} onClick={toggleCaptionWindow}>
        <CloseIcon />
      </button>
    </div>
  );
}
