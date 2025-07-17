import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Copy } from 'lucide-react';

const CopyToClipboardComponent: React.FC = () => {
  const [value, setValue] = useState('Copy this text!');
  const [copied, setCopied] = useState(false);

  return (
    <Card className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 shadow-xl rounded-xl flex flex-col items-center gap-4">
      <CardContent className="w-full flex flex-col items-center gap-4 p-0">
        <Input
          className="w-full text-lg font-medium border-2 border-blue-200 focus:border-blue-500 transition rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-800 dark:text-white shadow-sm"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter text to copy"
        />
        <CopyToClipboard text={value} onCopy={() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}>
          <Button
            variant="default"
            size="lg"
            className={`flex items-center gap-2 px-6 py-3 text-lg font-semibold shadow-lg transition-all duration-200 ${copied ? 'bg-green-500 hover:bg-green-600' : ''}`}
            type="button"
          >
            {copied ? <Check className="w-5 h-5 animate-bounce" /> : <Copy className="w-5 h-5" />}
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </Button>
        </CopyToClipboard>
      </CardContent>
    </Card>
  );
};

export default CopyToClipboardComponent; 