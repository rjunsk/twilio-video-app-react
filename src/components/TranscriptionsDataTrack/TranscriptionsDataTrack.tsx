import { useCallback, useEffect } from 'react';
import useCaptionContext from '../../hooks/useCaptionContext/useCaptionContext';

type TranscriptionMessage = {
  data: {
    isFinal: boolean;
    transcript: string;
  };
  identity: string;
  participantId: string;
  messageId: string;
};

export default function TranscriptionsDataTrack({ track }: { track: any }) {
  const { addMessages } = useCaptionContext();

  const onMessage = useCallback(
    (message: string) => {
      const transcription = JSON.parse(message);
      if (transcription.transcriptionResponse.TranscriptEvent.Transcript.Results.length) {
        const isFinal = !transcription.transcriptionResponse.TranscriptEvent.Transcript.Results[0].isPartial;
        const transcript =
          transcription.transcriptionResponse.TranscriptEvent.Transcript.Results[0].Alternatives[0].Transcript;

        addMessages({
          messageId: transcription.messageId,
          author: transcription.identity,
          sid: `${new Date().getTime()}`,
          dateCreated: new Date(),
          body: transcript,
          isFinal,
        });
      }
    },
    [addMessages]
  );
  /*
    {"transcriptionResponse":{"TranscriptEvent":{"Transcript":{"Results":[{"Alternatives":[{"Items":[{"Content":"Hello","EndTime":1.8725,"StartTime":1.2875,"Type":"pronunciation","VocabularyFilterMatch":false},{"Content":"?","EndTime":1.8725,"StartTime":1.8725,"Type":"punctuation","VocabularyFilterMatch":false},{"Content":"Hello","EndTime":2.7625,"StartTime":1.8725,"Type":"pronunciation","VocabularyFilterMatch":false},{"Content":"?","EndTime":2.7625,"StartTime":2.7625,"Type":"punctuation","VocabularyFilterMatch":false},{"Content":"Hello","EndTime":3.6625,"StartTime":2.7625,"Type":"pronunciation","VocabularyFilterMatch":false},{"Content":"?","EndTime":3.6625,"StartTime":3.6625,"Type":"punctuation","VocabularyFilterMatch":false},{"Content":"Hello","EndTime":4.4375,"StartTime":3.6625,"Type":"pronunciation","VocabularyFilterMatch":false},{"Content":"?","EndTime":4.4375,"StartTime":4.4375,"Type":"punctuation","VocabularyFilterMatch":false},{"Content":"Hello","EndTime":5.4575,"StartTime":5.1275,"Type":"pronunciation","VocabularyFilterMatch":false},{"Content":"?","EndTime":5.4575,"StartTime":5.4575,"Type":"punctuation","VocabularyFilterMatch":false},{"Content":"Hello","EndTime":6.0925,"StartTime":5.4575,"Type":"pronunciation","VocabularyFilterMatch":false},{"Content":"?","EndTime":6.0925,"StartTime":6.0925,"Type":"punctuation","VocabularyFilterMatch":false},{"Content":"Hello","EndTime":6.5775,"StartTime":6.0925,"Type":"pronunciation","VocabularyFilterMatch":false},{"Content":"?","EndTime":6.5775,"StartTime":6.5775,"Type":"punctuation","VocabularyFilterMatch":false},{"Content":"Yes","EndTime":7.7675,"StartTime":7.4075,"Type":"pronunciation","VocabularyFilterMatch":false},{"Content":".","EndTime":7.7675,"StartTime":7.7675,"Type":"punctuation","VocabularyFilterMatch":false}],"Transcript":"Hello? Hello? Hello? Hello? Hello? Hello? Hello? Yes."}],"EndTime":7.915,"IsPartial":true,"ResultId":"56e434f4-db19-490d-9cd8-ab382cd6e9b5","StartTime":0.9}]}}},"participantIdentity":"Arjun"}
    */
  useEffect(() => {
    // NOTE: instead of pushing to the provider the messages, we should
    // find the participant which has the localDataTrack and subscribe it there
    track.on('message', onMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  return null;
}
