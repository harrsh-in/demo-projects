import { convertFromUsd, convertToUsd } from "./utils";

const CurrencyConverter = () => {
    return (
        <div>
            <div>{convertToUsd("INR")}</div>
            <div>{convertFromUsd("INR")}</div>
        </div>
    );
};

export default CurrencyConverter;
