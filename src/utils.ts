export const convertToUsd = (myCurrency: "INR" | "MXN") => {
    // fx.base = "USD";
    // fx.rates = {
    //     USD: 1,
    //     INR: 50,
    //     MXN: 2,
    // };

    const rates = {
        USD: 1,
        INR: 50,
        MXN: 2,
    };

    const amount = 200;
    // return fx(amount).from(myCurrency).to("USD");
    return amount / rates[myCurrency];
};

export const convertFromUsd = (myCurrency: "INR" | "MXN") => {
    // fx.base = "USD";
    // fx.rates = {
    //     USD: 1,
    //     INR: 50,
    //     MXN: 2,
    // };

    const rates = {
        USD: 1,
        INR: 50,
        MXN: 2,
    };

    const amount = 1;
    // return fx(amount).from("USD").to(myCurrency);
    return amount * rates[myCurrency];
};
