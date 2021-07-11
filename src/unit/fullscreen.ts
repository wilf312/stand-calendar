export const toggleFullScreen = () => {
  // full screening
  const isFullScreen = !!document.fullscreenElement

  const hasFullScreenApi = document.documentElement.requestFullscreen

  if (!hasFullScreenApi) {
    console.error('Please check which version of the software you are using, just in case.')
    return 
  }

  if (isFullScreen) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen();
  }
}