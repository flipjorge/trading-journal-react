export const convertDateToInputFormat = (date:Date) => {
    const formattedDate = "" +
        date.getFullYear() + "-" +
        ('0' + (date.getMonth() + 1)).slice(-2) + "-" +
        ('0' + (date.getDate())).slice(-2) + "T" +
        ('0' + (date.getHours())).slice(-2) + ":" +
        ('0' + (date.getMinutes())).slice(-2);

    return formattedDate;
}