import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import CaptionWindowHeader from './CaptionWindowHeader/CaptionWindowHeader';
import MessageList from './MessageList/MessageList';
import useCaptionContext from '../../hooks/useCaptionContext/useCaptionContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    captionWindowContainer: {
      background: '#FFFFFF',
      zIndex: 9,
      display: 'flex',
      flexDirection: 'column',
      borderLeft: '1px solid #E4E7E9',
      [theme.breakpoints.down('sm')]: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 100,
      },
    },
    hide: {
      display: 'none',
    },
  })
);

export default function CaptionWindow() {
  const classes = useStyles();
  const { isCaptionWindowOpen, messages } = useCaptionContext();

  return (
    <aside className={clsx(classes.captionWindowContainer, { [classes.hide]: !isCaptionWindowOpen })}>
      <CaptionWindowHeader />
      <MessageList messages={messages} />
    </aside>
  );
}
