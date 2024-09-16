import { ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';

type ButtonProps = {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
};

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? 'shad-primary-btn w-full'}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading ...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
