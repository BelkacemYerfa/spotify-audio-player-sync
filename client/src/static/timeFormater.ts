export default (time: number) => {
  const min = Math.floor(time / 60000);
  const sec = ((time % 60000) / 1000).toFixed(0);
  return min + ":" + (parseInt(sec) < 10 ? "0" : "") + sec;
};
