const onlyDate = date => new Date(date).toLocaleDateString().split('/')[1]

export const recentMoment = (data) => {
    let last7DaysData = [];
    const last7Dates = [...Array(7)].map((_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - i);
        const createData = {
            price: 0,
            date: onlyDate(d),
        }
        last7DaysData.push(createData)
        return d
    })
    console.log(data);
    for (const element of data) {
        const orderDate = onlyDate(element.date);
        //console.log(element);
        for (const singleLast7Date of last7Dates) {
            const singleDate = onlyDate(singleLast7Date);
            if (parseInt(singleDate) === parseInt(orderDate)) {
                const index = last7DaysData.findIndex(everyData => everyData.date === singleDate)
                last7DaysData[index].price = last7DaysData[index]?.price + element.Price
                //console.log(last7DaysData[index]);
                break;
            }
        }
    }
    //console.log(last7DaysData);
    return last7DaysData.reverse();
}
export const totalEarning = (data) => {
    let price = 0;
    data.forEach(element => {
        // price = price + element.Price;
        if (element.Price) {

            price = price + element.Price;
        }
    });
    return price;
}
export const totalSales = (data) => {

    return data.length;
}
export const totalOrders = (data) => {
    const orders = data.filter(singleData => singleData.status === 'pending')
    return orders.length;
}
export const totalApproveOrders = (data) => {
    const orders = data.filter(singleData => singleData.status === 'approved')
    return orders.length;
}
export const todayEarning = (data) => {
    const todays = data.filter(singleData => onlyDate(singleData.date) === onlyDate(new Date()))
    let price = 0;
    todays.forEach(element => {
        // price = price + element.Price;
        if (element.Price) {

            price = price + element.Price;
        }
    });
    return price;
}


