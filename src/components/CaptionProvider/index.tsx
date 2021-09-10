import React, { createContext, useCallback, useState } from 'react';

type CaptionContextType = {
  isCaptionWindowOpen: boolean;
  toggleCaptionWindow: () => void;
  messages: any[];
  addMessages: (message: any) => void;
};

export const CaptionContext = createContext<CaptionContextType>(null!);

export const CaptionProvider: React.FC = ({ children }) => {
  const [isCaptionWindowOpen, setIsCaptionWindowpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const addMessages = useCallback((message: any) => {
    setMessages(state => state.concat(message));
  }, []);
  const toggleCaptionWindow = useCallback(() => setIsCaptionWindowpen(!isCaptionWindowOpen), [isCaptionWindowOpen]);
  return (
    <CaptionContext.Provider value={{ isCaptionWindowOpen, toggleCaptionWindow, messages, addMessages }}>
      {children}
    </CaptionContext.Provider>
  );
};
