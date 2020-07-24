import React, {Fragment} from "react";
import {storiesOf} from "@storybook/react-native";
import {ThemeProvider} from "@yosmy/style";
import Platform from "@yosmy/platform";
import PhoneUser from "@yosmy/phone-user";
import {Picture as BasePicture, Card, Container, Error, Layout, PrimaryButton, Text} from "@yosmy/ui";
import theme from "../theme";
import LoadAndListContacts from "../src/LoadAndListContacts";
import ContactPlaceholder from "../src/ContactPlaceholder";

// Init cache folder
Platform.cache.init().catch(() => {});
Platform.cache.delete("contacts").catch(() => {});

const Picture = ({
    source, ...props
}) => {
    return <BasePicture
        source={source || require("./person.png")}
        {...props}
    />;
};

const props = {
    ui: {
        layout: ({children, ...props}) => {
            return <Card
                margin={2}
                padding={0}
                {...props}
            >
                {children}
            </Card>
        },
        presentation: ({onClick}) => {
            return <Container
                flow="column"
                align={{
                    main: "flex-start",
                    cross: "center",
                }}
                margin={{
                    top: 1
                }}
                background={{
                    image: require("./contacts.png"),
                    resize: "contain"
                }}
                height={350}
            >
                <PrimaryButton
                    margin={{
                        top: 6
                    }}
                    onClick={onClick}
                >
                    <Text>Mostrar mis contactos</Text>
                </PrimaryButton>
            </Container>
        },
        loading: () => {
            return <Fragment>
                <ContactPlaceholder />
                <ContactPlaceholder />
                <ContactPlaceholder />
                <ContactPlaceholder />
                <ContactPlaceholder />
                <ContactPlaceholder />
                <ContactPlaceholder />
                <ContactPlaceholder />
            </Fragment>
        },
        item: ({index, country, prefix, number, nickname, picture}) => {
            return <PhoneUser.Presentation
                ui={{
                    picture: Picture
                }}
                key={index}
                country={country}
                prefix={prefix}
                number={number}
                nickname={nickname}
                picture={picture}
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
                border={{
                    color: theme.divider.border.color,
                    bottom: {
                        width: theme.divider.border.width
                    }
                }}
                onClick={() => {
                    console.log(country, prefix, number, nickname, picture);
                }}
            />
        },
        more: ({onClick}) => {
            return <Container
                flow="row"
                align={{
                    main: "center"
                }}
            >
                <PrimaryButton
                    margin={{
                        top: 2
                    }}
                    onClick={onClick}
                >
                    <Text>Mostrar más</Text>
                </PrimaryButton>
            </Container>
        },
        empty: () => {
            return <Text
                align={{
                    self: "center"
                }}
            >
                No se encontraron contactos en tu teléfono
            </Text>
        },
        none: () => {
            return <Text
                align={{
                    self: "center"
                }}
            >
                0 contactos encontrados
            </Text>
        },
        error: () => {
            return <Error>
                No fue posible acceder a tus contactos del teléfono.
            </Error>
        },
    },
    platform: {
        cache: Platform.cache,
        contact: Platform.contact
    },
    country: "US",
    criteria: {
        country: null,
        text: null,
        limit: 2
    },
    onEnrich: (contacts) => {
        return new Promise((resolve) => {
            return resolve(contacts);
        });
    }
};

storiesOf("LoadAndListContacts", module)
    .add("default", () => (
        <ThemeProvider theme={theme}>
            <LoadAndListContacts
                {...props}
            />
        </ThemeProvider>
    ))
;
