import React, {memo, useState, useEffect} from "react";
import PropTypes from "prop-types";
import Platform from "@yosmy/platform";
import ListContacts from "./ListContacts";

const LoadAndListContacts = memo(({
    ui, country, criteria, onEnrich
}) => {
    const [permission, setPermission] = useState(null);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        Platform.contact.check()
            .then(({status, canAskAgain}) => {
                setPermission({
                    status: status,
                    canAskAgain: canAskAgain,
                });
            })
            .catch(() => {
                setPermission({
                    status: "undetermined"
                });
            })
    }, []);

    if (permission === null) {
        return <ui.layout />;
    }

    if (
        permission.status === "undetermined"
        || (permission.status === "denied" && permission.canAskAgain === true)
    ) {
        return <ui.layout>
            <ui.presentation
                onClick={() => {
                    // Need to ask for permissions
                    Platform.contact.prepare()
                        .then((permission) => {
                            const {status, canAskAgain} = permission;

                            setAttempts(prev => prev + 1);

                            setPermission({
                                status: status,
                                canAskAgain: canAskAgain
                            });
                        })
                }}
            />
        </ui.layout>;
    }

    if (
        (permission.status === "denied" && permission.canAskAgain === false)
        || attempts === 3
    ) {
        return <ui.layout>
            <ui.error />
        </ui.layout>;
    }

    // permission.status = "granted"

    return <ListContacts
        ui={{
            layout: ui.layout,
            loading: ui.loading,
            item: ui.item,
            more: ui.more,
            empty: ui.empty,
            none: ui.none,
        }}
        country={country}
        criteria={criteria}
        onEnrich={onEnrich}
    />
}, (prev, next) => {
    return (
        prev.criteria === next.criteria
    );
});

LoadAndListContacts.propTypes = {
    ui: PropTypes.shape({
        layout: PropTypes.func.isRequired,
        presentation: PropTypes.func.isRequired,
        loading: PropTypes.func.isRequired,
        item: PropTypes.func.isRequired,
        empty: PropTypes.func.isRequired,
        none: PropTypes.func.isRequired,
        error: PropTypes.func.isRequired,
    }).isRequired,
    country: PropTypes.string.isRequired, // The country context
    criteria: PropTypes.shape({
        country: PropTypes.string,
        text: PropTypes.string,
        limit: PropTypes.number.isRequired,
    }).isRequired,
    onEnrich: PropTypes.func.isRequired,
};

export default LoadAndListContacts;