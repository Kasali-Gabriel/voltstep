'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Clipboard } from 'lucide-react';
import { toast } from 'sonner';

export const CopyButton = ({ text }: { text: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleCopy}
          className="cursor-pointer rounded p-1 hover:bg-gray-200"
        >
          <Clipboard className="size-3.5 text-gray-600" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy to clipboard</p>
      </TooltipContent>
    </Tooltip>
  );
};
