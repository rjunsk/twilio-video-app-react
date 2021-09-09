import React, { useEffect, useState } from 'react';
import useParticipants from '../../hooks/useParticipants/useParticipants';

type onMessage = { participantId: string; identity: string; data: { transcript: string; isFinal: boolean } };

type Transcription = {
  timestamp: number;
  participantSid: string;
  identity: string;
  isFinal: boolean;
  transcript: string;
};

export default function TranscriptionsDataTrack({ track }: { track: any }) {
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const participants = useParticipants();
  console.log(participants);
  useEffect(() => {
    track.on('message', (message: string) => {
      console.log(message);
      setTranscriptions(state => {
        const {
          participantId,
          identity,
          data: { transcript, isFinal },
        } = JSON.parse(message) as onMessage;
        const index = state.findIndex(
          transcription => transcription.participantSid === participantId && transcription.isFinal === false
        );
        if (index !== -1) {
          state[index] = {
            ...state[index],
            transcript,
            isFinal,
          };
        } else {
          state?.push({
            timestamp: new Date().getTime(),
            participantSid: participantId,
            identity,
            isFinal,
            transcript,
          });
        }

        return [...state];
      });
    });
  }, [track]);

  console.log(transcriptions);

  return (
    <pre style={{ position: 'absolute', zIndex: 1, color: 'white', bottom: 1, marginLeft: '5px' }}>
      {transcriptions.map(transcription => `(${transcription.identity}): ${transcription.transcript}\n`)}
    </pre>
  );
}

// {participantSid} dijo tal \n
// {participantSid} aquello eso cwha \n

// [
//   'ricardo', [['frases finales', 'luego he dixo'], ['hola', 'hola que tal', 'hola que tal ricardo']],
//   'tomeu', [[], []]
// ]

// luego he dixo [F]
// hola que tal ricardo [F]

// [
//   {
//     timestamp,
//     participantName,
//     final,
//     transcript: hola que tal
//   },
//   {
//     timestamp,
//     participantName,
//     final,
//     transcript: hola que tal
//   }
// ]
