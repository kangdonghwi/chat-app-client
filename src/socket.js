import openSocket from "socket.io-client";
export const socket = openSocket(`https://sixweeks-server.herokuapp.com/`);
