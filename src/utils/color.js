export const getCreateColorMethod = (slip, color) => {
  return (opacity) =>
    `${
      opacity
        ? `rgba(${slip[0]}, ${slip[1]}, ${slip[2]}, ${opacity})`
        : `${color}`
    }`;
};
