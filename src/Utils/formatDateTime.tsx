
export const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const formattedDate = date.toLocaleDateString("en-GB");
    return `${formattedTime} - ${formattedDate}`;
  };