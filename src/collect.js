import Platform from "@yosmy/platform";
import uniqBy from "lodash/uniqBy";
import sortBy from "lodash/sortBy";
import {build as buildPhone} from "@yosmy/phone-build";
import {passPhoneFilter} from "./filter";

const collect = async (country, criteria) => {
    let contacts = await resolveNormalization(country);

    contacts = await resolveFiltration(
        contacts,
        {
            country: criteria.country,
            text: criteria.text
        }
    );

    contacts = await resolveSplit(
        contacts,
        {
            skip: criteria.skip,
            limit: criteria.limit,
        }
    );

    return contacts;
};

const resolveNormalization = async (country) => {
    let raw = await Platform.cache.get("contacts");

    if (typeof raw !== "undefined") {
        return raw;
    }

    raw = await Platform.contact.all(
        [
            Platform.contact.Emails,
            Platform.contact.PhoneNumbers
        ]
    );

    let normalization = [];

    raw.forEach((contact) => {
        if (!contact.phoneNumbers) {
            return null;
        }

        const phones = contact.phoneNumbers
            .map(({id, number}) => {
                try {
                    const phone = buildPhone(number, country);

                    if (
                        !phone.country
                        || !phone.prefix
                        || !phone.number
                    ) {
                        // console.log(number, phone, "Incomplete phone number");

                        return false;
                    }

                    return {
                        id: id,
                        country: phone.country,
                        prefix: phone.prefix,
                        number: phone.number,
                        nickname: contact.name,
                    };
                } catch (e) {
                    // console.log(e);

                    return false;
                }
            });

        normalization = normalization.concat(phones);
    });

    // Remove falsy
    normalization = normalization.filter(x => x);

    // Remove duplicated
    normalization = uniqBy(normalization, (contact) => {
        const {prefix, number} = contact;

        return `${prefix}-${number}`;
    });

    // Sort
    normalization = sortBy(normalization, ({nickname}) => {
        return nickname;
    });

    Platform.cache.set("contacts", normalization);

    return normalization;
};

const resolveFiltration = async (contacts, filter) => {
    if (!filter.country && !filter.text) {
        return contacts;
    }

    return contacts
        .map((contact) => {
            if (!passPhoneFilter(
                {
                    country: filter.country,
                    text: filter.text,
                },
                contact
            )) {
                return null;
            }

            return contact;
        })
        .filter(x => x);
};

const resolveSplit = async (contacts, criteria) => {
    return contacts.slice(
        criteria.skip,
        criteria.skip + criteria.limit
    );
};

export default collect;