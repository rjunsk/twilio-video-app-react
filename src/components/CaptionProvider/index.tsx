import React, { createContext, useCallback, useState } from 'react';

export type TranscriptionMessage = {
  author: string;
  sid: string;
  dateCreated: Date;
  body: string;
  isFinal: boolean;
  messageId: string;
};

type CaptionContextType = {
  isCaptionWindowOpen: boolean;
  toggleCaptionWindow: () => void;
  messages: TranscriptionMessage[];
  addMessages: (transcriptionMessage: TranscriptionMessage) => void;
};

export const CaptionContext = createContext<CaptionContextType>(null!);

export const CaptionProvider: React.FC = ({ children }) => {
  const [isCaptionWindowOpen, setIsCaptionWindowpen] = useState(false);
  const [messages, setMessages] = useState<TranscriptionMessage[]>([]);
  const addMessages = useCallback((transcription: TranscriptionMessage) => {
    console.log(transcription);
    setMessages(transcriptions => transcriptions.concat(transcription));
  }, []);
  const toggleCaptionWindow = useCallback(() => setIsCaptionWindowpen(!isCaptionWindowOpen), [isCaptionWindowOpen]);
  return (
    <CaptionContext.Provider value={{ isCaptionWindowOpen, toggleCaptionWindow, messages, addMessages }}>
      {children}
    </CaptionContext.Provider>
  );
};
