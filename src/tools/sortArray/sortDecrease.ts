const sortDecrease = (arr: any[]) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < (arr.length - i - 1); j++) {
            if (parseInt(arr[j].date.slice(0, 1)) < parseInt(arr[j + 1].date.slice(0, 1))) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}

export default sortDecrease;