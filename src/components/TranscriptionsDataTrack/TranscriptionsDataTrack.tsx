import React, { useEffect } from 'react';

export default function TranscriptionsDataTrack({ track }: { track: any }) {
  useEffect(() => {
    track.on('message', (data: any) => {
      console.log(data);
    });
  }, [track]);

  return null;
}
