const express = require('express');
const fs = require('fs');
const router = express.Router();


function getMessagesHtml() {
    try {
        const fileText = fs.readFileSync('messages.txt', 'utf8');
        const msg = fileText.split("\n");
        return msg.map(line => `<p>${line}</p><br>`).join('');
    } catch (err) {
        console.error("Error reading file", err);
        return "<p>Error loading messages</p>";
    }
}

router.get('/', (req, res) => {
    const messagesHtml = getMessagesHtml();
    return res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="div">${messagesHtml}</div>
    <form action="/" method="POST">
        <input type="text" name="messages" id="messages" />
        <input type="hidden" name="localStorageData" id="localStorageData" />
        <br>
        <button type="submit"> Send</button>
    </form>
    <script>
        document.addEventListener('DOMContentLoaded', (event) => {
            const localStorageData = localStorage.getItem('userName');
            document.getElementById('localStorageData').value = localStorageData || '';
        });
    </script>
</body>
</html>`);
});

router.post('/', (req, res) => {
    const userName = req.body.localStorageData;
    const newMessage = `${userName}: ${req.body.messages}\n`;
    console.log(newMessage);

    fs.appendFile('messages.txt', newMessage, (err) => {
        if (err) {
            console.error("Error writing to file", err);
            res.status(500).send('Server error');
            return;
        }

        const messagesHtml = getMessagesHtml();
        res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="div">${messagesHtml}</div>
    <form action="/" method="POST">
        <input type="text" name="messages" id="messages" />
        <input type="hidden" name="localStorageData" id="localStorageData" />
        <br>
        <button type="submit"> Send</button>
    </form>
    <script>
        document.addEventListener('DOMContentLoaded', (event) => {
            const localStorageData = localStorage.getItem('userName');
            document.getElementById('localStorageData').value = localStorageData || '';
        });
    </script>
</body>
</html>`);
    });
});

module.exports = router;
