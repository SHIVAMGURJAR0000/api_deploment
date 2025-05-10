exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const { data } = body;

  if (!Array.isArray(data)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "error",
        message: "Data must be an array.",
      }),
    };
  }

  const numbers = [];
  const alphabets = [];

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else {
      alphabets.push(item);
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "success",
      numbers,
      alphabets,
      user_id: "Shivam_Gurjar_0704200",
      email_id: "shivamgurjar220386@acropolis.in",
      college_roll_number: "0827CY221057",
    }),
  };
};
