import { useCallback, useEffect } from 'react';
import useCaptionContext from '../../hooks/useCaptionContext/useCaptionContext';

type TranscriptionMessage = {
  data: {
    isFinal: boolean;
    transcript: string;
  };
  identity: string;
  participantId: string;
};

export default function TranscriptionsDataTrack({ track }: { track: any }) {
  const { addMessages } = useCaptionContext();

  const onMessage = useCallback(
    (message: string) => {
      const transcription = JSON.parse(message) as TranscriptionMessage;

      addMessages({
        author: transcription.identity,
        sid: `${new Date().getTime()}`,
        dateCreated: new Date(),
        body: transcription.data.transcript,
        isFinal: transcription.data.isFinal,
      });
    },
    [addMessages]
  );

  useEffect(() => {
    // NOTE: instead of pushing to the provider the messages, we should
    // find the participant which has the localDataTrack and subscribe it there
    track.on('message', onMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  return null;
}
