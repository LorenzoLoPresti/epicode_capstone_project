import { createAction } from "@reduxjs/toolkit";

export const addToken = createAction<string>("ADD_TOKEN"); // creo l'azione e definisco il tipo del payload
