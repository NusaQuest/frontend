export function handleError(error) {
  return {
    status: error.response?.status || 500,
    message: error.response?.data?.message || "Internal Server Error",
    detail: error.response?.data || null,
  };
}

export function handleSuccess(res) {
  return res.data;
}
