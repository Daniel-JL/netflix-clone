const getPage = async (url) => {
  let data;
  try {
    data = await fetch(url)
      .then(
        (response) => response.json(),
      );
  } catch (error) {
    console.log(error);
    throw (error);
  }

  return data;
};

export default getPage;
