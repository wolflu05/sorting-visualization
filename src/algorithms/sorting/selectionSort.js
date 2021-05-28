const sort = ({ pipes, setPipes }) => {
  const res = pipes.sort((a, b) => a.value - b.value);

  console.log(res);
};

export default sort;
