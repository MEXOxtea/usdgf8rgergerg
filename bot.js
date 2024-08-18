const TelegramBot = require('node-telegram-bot-api');
const os = require('os');

// Replace with your Telegram bot token
const token = '7541625467:AAF6eiXRCK97Csj_n44-YRWXHtSmm9W7JpQ';

// Create a bot using polling mode (removed webhook)
const bot = new TelegramBot(token, { polling: true });

// Optimized function to calculate primes using the Sieve of Eratosthenes
const calculatePrimes = (limit) => {
    let sieve = [];
    let primes = [];
    for (let i = 2; i <= limit; i++) {
        if (!sieve[i]) {
            primes.push(i);
            for (let j = i * i; j <= limit; j += i) {
                sieve[j] = true;
            }
        }
    }
    return primes;
};

// Function to perform a simple performance test
const performanceTest = () => {
    const start = process.hrtime.bigint();
    const primes = calculatePrimes(10000);
    const end = process.hrtime.bigint();
    const duration = (end - start) / 1000000n; // convert to milliseconds

    return `Performance Test Completed!\nPrimes Calculated: ${primes.length}\nTime Taken: ${duration} ms\nCPU Cores: ${os.cpus().length}\nFree Memory: ${(os.freemem() / (1024 * 1024)).toFixed(2)} MB\nTotal Memory: ${(os.totalmem() / (1024 * 1024)).toFixed(2)} MB`;
};

// Handle /admin command
bot.onText(/\/admin (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const address = match[1]; // Extract the name from the command
    
    try {
        const result = performanceTest();
        bot.sendMessage(chatId, result);
    } catch (error) {
        console.error('Error processing /admin command:', error);
        bot.sendMessage(chatId, 'An error occurred while processing your request.');
    }
});

console.log('Bot started and running...');
