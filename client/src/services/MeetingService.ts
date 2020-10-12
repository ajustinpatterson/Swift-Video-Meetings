const getMeeting = () => {
  return fetch('http://localhost/3002/').catch((err) => {
    console.log(err);
  });
};

export { getMeeting };
