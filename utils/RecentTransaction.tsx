import moment from "moment";
const isRecentTransaction = (date: Date | undefined) => {
  const formattedDate = moment(date).format("YYYY-MM-DD");
  return (
    formattedDate === moment().format("YYYY-MM-DD") ||
    formattedDate === moment().subtract(1, "day").format("YYYY-MM-DD")
  );
};
export default isRecentTransaction;
