import React from "react";
import {CirclePlaceholder, Container, LinePlaceholder} from "@yosmy/ui";

const ContactPlaceholder = () => {
    return <Container
        flow="row"
        align={{
            self: "stretch",
            main: "flex-start",
            cross: "center"
        }}
        margin={{
            top: 0,
            bottom: 2
        }}
        padding={{
            top: 0,
            bottom: 2,
            left: 2,
            right: 2
        }}
    >
        <CirclePlaceholder size={35} />
        <Container
            margin={{
                left: 1
            }}
        >
            <LinePlaceholder
                width={120}
            />
            <LinePlaceholder
                width={80}
                margin={{
                    top: 1
                }}
            />
        </Container>
    </Container>
};

export default ContactPlaceholder;