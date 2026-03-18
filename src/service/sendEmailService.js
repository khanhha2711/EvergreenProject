export const sendEmailService = async ({ type, data }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          data,
        }),
      },
    );
  } catch (error) {
    console.error(error);
  }
};
