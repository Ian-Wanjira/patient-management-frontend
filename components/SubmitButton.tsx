import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

type ButtonProps = {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
};

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button type="submit" disabled={isLoading} className={className}>
      {isLoading ? (
        <div className="flex items-center">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading ...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
