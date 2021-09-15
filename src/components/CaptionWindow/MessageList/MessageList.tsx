import React from 'react';
import MessageInfo from './MessageInfo/MessageInfo';
import MessageListScrollContainer from './MessageListScrollContainer/MessageListScrollContainer';
import TextMessage from './TextMessage/TextMessage';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';
import { TranscriptionMessage } from '../../CaptionProvider';

interface MessageListProps {
  messages: TranscriptionMessage[];
}

const getFormattedTime = (message?: TranscriptionMessage) =>
  message?.dateCreated.toLocaleTimeString('en-us', { hour: 'numeric', minute: 'numeric' }).toLowerCase();

export default function MessageList({ messages }: MessageListProps) {
  const { room } = useVideoContext();
  const localParticipant = room!.localParticipant;

  return (
    <MessageListScrollContainer messages={messages}>
      {messages
        .filter((message, index, array) => {
          // get the last message from messageId group
          return array.map(msg => msg.messageId).lastIndexOf(message.messageId) === index;
        })
        .map((message, idx) => {
          const time = getFormattedTime(message)!;
          const previousTime = getFormattedTime(messages[idx - 1]);

          // Display the MessageInfo component when the author or formatted timestamp differs from the previous message
          const shouldDisplayMessageInfo = time !== previousTime || message.author !== messages[idx - 1]?.author;

          const isLocalParticipant = localParticipant.identity === message.author;

          return (
            <React.Fragment key={message.sid}>
              {shouldDisplayMessageInfo && (
                <MessageInfo author={message.author} isLocalParticipant={isLocalParticipant} dateCreated={time} />
              )}
              <TextMessage body={message.body} isLocalParticipant={isLocalParticipant} />
            </React.Fragment>
          );
        })}
    </MessageListScrollContainer>
  );
}
