export const formatTime = (seconds: number) => {
  let minutes = Math.floor(seconds/60)
  seconds -= minutes * 60

  let minutesString = `${minutes < 10 ? '0'+minutes : minutes}`
  let secondsString = `${seconds < 10 ? '0'+seconds : seconds}`

  return `${minutesString}:${secondsString}`
}