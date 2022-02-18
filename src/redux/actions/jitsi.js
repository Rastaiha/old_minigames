export const onMessage = (message) => {
  alert(message);
  switch (message.type) {
    default:
      return {
        type: 'NO_NEED',
      };
  }
};
