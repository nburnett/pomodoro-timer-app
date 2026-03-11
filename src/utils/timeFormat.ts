/**
 * Formats time from seconds to MM:SS format
 * @param seconds - The time in seconds to format
 * @returns Formatted time string in MM:SS format
 */
export function formatTime(seconds: number): string {
  // Handle negative values by treating them as 0
  if (seconds < 0) {
    seconds = 0;
  }

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Format with zero-padding
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}