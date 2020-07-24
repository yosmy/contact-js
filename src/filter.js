import {normalize as normalizeString} from "@yosmy/string";

const passPhoneFilter = (filter, {country, number, nickname}) => {
    return (
        passCountry(
            {
                country: filter.country
            },
            country
        )
        && (
            passNumber(
                {
                    text: filter.text
                },
                number
            )
            || passNickname(
                {
                    text: filter.text
                },
                nickname
            )
        )
    );
};

const passCountry = (filter, country) => {
    if (!filter.country) {
        return true;
    }

    return filter.country === country;
}

const passNumber = (filter, number) => {
    if (!filter.text) {
        return true;
    }

    if (!number) {
        return false;
    }

    return number.indexOf(filter.text) !== -1;
}

const passNickname = (filter, nickname) => {
    if (!filter.text) {
        return true;
    }

    if (!nickname) {
        return false;
    }

    const text = normalizeString(filter.text);

    nickname = normalizeString(nickname);

    return nickname.indexOf(text) !== -1;
}

export {
    passPhoneFilter
};