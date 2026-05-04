import { SearchX } from "lucide-react";

interface EmptyStateProps {
  message?: string;
}

const EmptyState = ({
  message = "No users found matching your criteria",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-black">
      <SearchX className="w-12 h-12 text-gray-400 mb-4" />
      <p className="text-gray-500 text-lg font-medium text-center">{message}</p>
      <p className="text-gray-400 text-sm mt-2 text-center">
        Try adjusting your filters or add a new user.
      </p>
    </div>
  );
};

export default EmptyState;
