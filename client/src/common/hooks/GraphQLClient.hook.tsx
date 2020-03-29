import React, { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';

export const BASE_URL = `api/graphql`;

export const useClient = () => {

    return new GraphQLClient(BASE_URL, {
        credentials: 'include',
        mode: 'cors'
    })
}

