const TelegramBot = require('node-telegram-bot-api');
const os = require('os');
const fs = require('fs');
const path = require('path');

// Replace with your Telegram bot token
const token = '7541625467:AAF6eiXRCK97Csj_n44-YRWXHtSmm9W7JpQ';

// Create a bot using webhook mode
const bot = new TelegramBot(token);

// Function to perform a simple performance test
const performanceTest = () => {
    const start = process.hrtime.bigint();
    
    // Example performance test: calculate primes
    const calculatePrimes = (limit) => {
        let primes = [];
        for (let i = 2; i <= limit; i++) {
            let isPrime = true;
            for (let j = 2; j < i; j++) {
                if (i % j === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) primes.push(i);
        }
        return primes;
    };

    // Run the test
    const primes = calculatePrimes(10000);
    const end = process.hrtime.bigint();
    const duration = (end - start) / 1000000n; // convert to milliseconds

    return `Performance Test Completed!\nPrimes Calculated: ${primes.length}\nTime Taken: ${duration} ms\nCPU Cores: ${os.cpus().length}\nFree Memory: ${(os.freemem() / (1024 * 1024)).toFixed(2)} MB\nTotal Memory: ${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB`;
};

// Handle incoming webhook requests and serve the webpage
module.exports = (req, res) => {
    if (req.method === 'POST') {
        const update = req.body;

        // Process the update
        const chatId = update.message.chat.id;
        const result = performanceTest();

        // Send the result back to the user
        bot.sendMessage(chatId, result);

        res.status(200).send('OK');
    } else if (req.method === 'GET') {
        // Serve the simple webpage
        const filePath = path.join(__dirname, '../index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.status(500).send('Error loading page');
            } else {
                res.status(200).send(data);
            }
        });
    } else {
        res.status(404).send('Not Found');
    }
};

bot.onText(/\/admin (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const address = match[1]; // Extract the name from the command
    const userId = msg.from.id.toString();
    // Log the name to the console
    bot.sendMessage(chatId, `Hello`)
});

console.log('bot started');