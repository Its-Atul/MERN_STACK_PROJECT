export const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('en-US',{
        day:"long",
        month:'2-digit',
        year:"numeric",
    }).split("/").join("-");
}