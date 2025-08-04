export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="w-16 h-16 border-4 border-space-gradient-start/20 border-t-space-gradient-start rounded-full animate-spin" />
    </div>
  );
}