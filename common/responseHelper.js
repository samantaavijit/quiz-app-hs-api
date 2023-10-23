const commonMessage = {
  API_ERROR: "Something went wrong",
  UN_AUTHORIZED: "You are not logged in. Please log in to continue",
  TOKEN_EXPIRED: "Token expired. Please log in to continue",
  COMPLETE_MANDATORY_FIELD: "Please complete all mandatory fields",
};

const response = async ({ status, statusCode, response, res }) => {
  // await APILOGS.updateOne(
  //   { _id: res.local.api_log_id },
  //   {
  //     statusCode: statusCode,
  //     response: response,
  //     status: status,
  //   }
  // );

  // if (response.err) {
  //   response.err = (typeof response.err == 'object') ? response.err.stack : response.err
  //   SendErrorMail(response.err, res.originalUrl)
  // }

  res.status(statusCode).json(response);
};

module.exports = {
  commonMessage,
  response,
};
