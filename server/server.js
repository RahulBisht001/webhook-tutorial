const express = require("express");
const app = express();

const axios = require("axios");
const PORT = 5600;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.end("Webhook server started");
});

const webhooks = {
    COMMIT: [],
    PUSH: [],
    MERGE: [],
};

/**
 * In actual production grade application we
 * store these webhook urls in a database and
 * trigger the webhook when a particular event occurs
 */

app.post("/api/webhooks", (req, res) => {
    const {payloadUrl, secret, eventTypes} = req.body;

    eventTypes.forEach((eventType) => {
        webhooks[eventType].push({payloadUrl, secret});
    });

    return res.status(201).json({message: "Webhook registered successfully"});
});

app.post("/api/event-emulate", (req, res) => {
    const {type, data} = req.body;

    // Business logic of the application

    // Trigger the webhook
    // make a webhook call
    // Asynchronous calls on webhooks

    // Event trigger (Call Webhook)
    setTimeout(async () => {
        const webhookList = webhooks[type];
        for (let i = 0; i < webhookList.length; i++) {
            const webhook = webhookList[i];
            const {payloadUrl, secret} = webhook;

            try {
                await axios.post(payloadUrl, data, {
                    headers: {
                        "x-secret": secret,
                    },
                });
            } catch (err) {
                console.log("Error hai");
            }
        }
    }, 0);

    // setTimeout(() => {
    //     try {
    //         webhooks[type].forEach(async (webhook) => {
    //             const {payloadUrl, secret} = webhook;
    //             console.log("secret is :", secret);

    //             const res = await axios.post(payloadUrl, data, {
    //                 headers: {
    //                     "x-secret": secret,
    //                 },
    //             });
    //             console.log("data is :");
    //         });
    //     } catch (error) {
    //         console.log("error hai");
    //     }
    // }, 0);

    return res.status(200).json({message: `${type} Event emulated successfully`});
});

// This is just for understanding purposes.
// don't do this in Real app
app.get("/api/db", (req, res) => {
    return res.json(webhooks);
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
