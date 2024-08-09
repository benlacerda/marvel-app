// src/services/api.ts
import axios from 'axios';
import { md5 } from 'js-md5';

const timestamp = new Date().getTime();
const privateKey = '87fa489e3b6ede3be6a73bfddd29ac30ac6314d1';
const publicKey = 'e73c0da38e17f3161b7218b2fe621608';

const hash = md5(timestamp + privateKey + publicKey);

export const api = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public/',
    params: {
        apikey: publicKey,
        hash,
        ts: timestamp,
    },
});
