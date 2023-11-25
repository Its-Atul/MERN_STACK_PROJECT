export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString("en-US", options);

    // for formatted time 
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM"
    const formattedTime = `${hours % 12}:${minutes.toString().padStart(2, "0")} ${period}` 

    return `${formattedDate} | ${formattedTime}`
}