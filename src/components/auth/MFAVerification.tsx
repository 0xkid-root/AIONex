import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MFAVerificationProps {
  onVerify: () => void;
}

export function MFAVerification({ onVerify }: MFAVerificationProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`mfa-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold">Two-Factor Authentication</h2>
        <p className="text-gray-600 mt-2">
          Enter the verification code sent to your device
        </p>
      </div>

      <div className="flex justify-center space-x-2">
        {code.map((digit, index) => (
          <Input
            key={index}
            id={`mfa-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-12 h-12 text-center text-2xl"
          />
        ))}
      </div>

      <Button
        onClick={onVerify}
        className="w-full"
        disabled={code.some((digit) => !digit)}
      >
        Verify
      </Button>
    </motion.div>
  );
}