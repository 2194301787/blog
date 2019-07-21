import io from 'socket.io-client';
import {SocketURL} from './baseURL';

const socket = io(`ws://${SocketURL}`);

export default socket;