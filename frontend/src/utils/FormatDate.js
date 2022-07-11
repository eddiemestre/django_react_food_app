export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const parseDate = (date) => {
    var parsed = null;
    var temp = date;
    if (date.includes('T')) {
        temp = date.split('T');
        temp = temp[0]
        // console.log("temp parsed", temp)

        // console.log("parsed", temp)
    }
    // console.log(temp)
    temp = temp.split('-')
    temp = `${temp[2]}-${temp[1]}-${temp[0]}`
    parsed = temp.split('-');
        if (parsed) {
            if (parsed[0][0] === '0') {
                parsed[0] = parsed[0][1]
            }
        }

        // console.log("Final parsed", parsed)
    // console.log(parsed)
    return parsed;
}


export const formatDate = (date) => {
    // console.log("Format date", date)
    // console.log("inside formatted date", date)
    if (!date) {
        return null
    }

    // if date is formatted correctly, don't reformat
    if (isLetter(date)) {
        return date
    }

    const parse = parseDate(date)
    const newDate = `${months[parseInt(parse[1] - 1)]} ${parse[0]}, ${parse[2]}`
    // console.log("new Date", newDate)
    return newDate;
}

const isLetter = (str) => {
    return str.length >= 1 && str[0].match(/[a-z]/i);
}