import { motion } from 'framer-motion';
import { Github, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SocialLogin() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div whileHover={{ scale: 1.02 }}>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => console.log('GitHub login')}
        >
          <Github className="h-4 w-4 mr-2" />
          GitHub
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.02 }}>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => console.log('Google login')}
        >
          <Chrome className="h-4 w-4 mr-2" />
          Google
        </Button>
      </motion.div>
    </div>
  );
}