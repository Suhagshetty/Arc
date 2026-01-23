"use client";

import { Button } from '@/components/ui/button';
import { Mic, Paperclip, Send } from 'lucide-react';
import AiMultiModels from './AiMultiModels';
import { useState } from 'react';

const ChatInputBox = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // Handle send logic here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className='relative min-h-screen bg-background'>
      {/* Page content */}
      <div className='pb-32'>
        <AiMultiModels />
      </div>

      {/* Fixed Chat Input */}
      <div className='fixed bottom-0 left-0 w-full flex justify-center px-4 pb-4 bg-gradient-to-t from-background via-background to-transparent pt-8'>
        <div className='w-full border rounded-xl shadow-lg max-w-2xl p-4 bg-background'>
          <input
            type='text'
            placeholder='Ask me anything'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className='outline-none border-0 w-full bg-transparent'
          />
          <div className='mt-3 flex justify-between items-center'>
            <Button variant='ghost' size='icon'>
              <Paperclip className='h-5 w-5' />
            </Button>
            <div className='flex gap-2'>
              <Button variant='ghost' size='icon'>
                <Mic className='h-5 w-5' />
              </Button>
              <Button
                size='icon'
                className='bg-blue-500 hover:bg-blue-600'
                onClick={handleSend}
                disabled={!message.trim()}
              >
                <Send className='h-5 w-5' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInputBox;