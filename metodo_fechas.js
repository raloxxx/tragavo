function setPromotionDays(start, end) {

    let array = []
    const s = new Date(start['year'], start['month'], start['day'])
    const sf = new Date(start['year'], start['month'], 0)

    const e = new Date(end['year'], end['month'], end['day'])

    for (let i = s.getMonth(); i <= e.getMonth(); i += 1) {

        if (i == s.getMonth()) {
            array = addDays(array, { day: s.getDate(), month: i }, sf.getDate())
        }

        if (i > s.getMonth() && i < e.getMonth()) {
            let date = new Date(start['year'], i, 0)
            array = addDays(array, { day: 1, month: i }, date.getDate())
        }

        if (i == e.getMonth()) {
            array = addDays(array, { day: 1, month: i }, e.getDate())
        }


    }
    return array
}

function addDays(array, start, end) {
    for (let i = start['day']; i <= end; i += 1) {
        array.push({ month: start['month'], day: i })
    }

    return array
}