import express from 'express'

const app = express();

app.get('/', (_, res) => {
    res.send('Hellow world');
});

app.listen('8080', () => {
    console.log('Server is running')
})