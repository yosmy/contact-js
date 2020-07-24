import React, {memo, useState, useEffect} from "react";
import PropTypes from "prop-types";
import collect from "./collect";

const ListContacts = memo(({
    ui, country, criteria: initialCriteria, onEnrich
}) => {
    const [chunks, setChunks] = useState(null);
    const [criteria, setCriteria] = useState({
        skip: 0,
        limit: initialCriteria.limit,
    });
    const [more, setMore] = useState(true);
    const [error, setError] = useState(false);

    useEffect(
        () => {
            if (chunks === null) {
                return;
            }

            setChunks(null);
            setCriteria({
                skip: 0,
                limit: initialCriteria.limit,
            });
            setMore(true);
        },
        [initialCriteria]
    );

    useEffect(
        () => {
            collect(
                country,
                {
                    country: initialCriteria.country,
                    text: initialCriteria.text,
                    skip: criteria.skip,
                    limit: criteria.limit,
                }
            )
                .then((contacts) => {
                    setChunks((prev) => {
                        if (prev === null) {
                            prev = [];
                        }

                        return prev.concat(
                            <ShowChunk
                                key={prev.length + 1}
                                ui={{
                                    layout: React.Fragment,
                                    item: ui.item
                                }}
                                items={contacts}
                                onEnrich={onEnrich}
                            />
                        );
                    });

                    if (contacts.length === 0) {
                        setMore(false);
                    }
                })
                .catch(() => {
                    setError(true);
                })
        },
        [criteria]
    );

    if (chunks === null) {
        return <ui.layout>
            <ui.loading />
        </ui.layout>
    }

    if (error) {
        return <ui.layout>
            <ui.error />
        </ui.layout>
    }

    return <ui.layout>
        {chunks}
        {more && <ui.more
            onClick={() => {
                setCriteria((prev) => {
                    return {
                        ...prev,
                        skip: prev.skip + prev.limit
                    };
                });
            }}
        />}
    </ui.layout>
}, (prev, next) => {
    return (
        prev.criteria === next.criteria
    );
});

ListContacts.propTypes = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired,
        loading: PropTypes.func.isRequired,
        item: PropTypes.func.isRequired,
        more: PropTypes.func.isRequired,
        empty: PropTypes.func.isRequired,
        none: PropTypes.func.isRequired,
    }).isRequired,
    country: PropTypes.string.isRequired, // The country context
    criteria: PropTypes.shape({
        country: PropTypes.string,
        text: PropTypes.string,
        limit: PropTypes.number.isRequired,
    }).isRequired,
    onEnrich: PropTypes.func.isRequired,
};

const ShowChunk = ({
    ui, items: initialItems, onEnrich
}) => {
    const [items, setItems] = useState(initialItems);

    useEffect(
        () => {
            onEnrich(
                items
            )
                .then((items) => {
                    setItems(items);
                })
        },
        []
    );

    if (items.length === 0) {
        return null;
    }

    return <ui.layout>
        {items.map((item) => {
            return <ui.item
                {...item}
                key={`${item.prefix}-${item.number}`}
            />
        })}
    </ui.layout>
};

export default ListContacts;