// import React from 'react';
// import { useClient } from './GraphQLClient.hook';
// import queries from '../graphql/queries';
// import axios from 'axios';
// import { deleteManyClientsMutation } from '../graphql/mutations/client.mutation';

// const { clientQuery, clientsQuery } = queries;

// const useClientApi = () => {

//     const client = useClient();

//     const getClient = async (id: string) => {
//         console.log({ id })
//         const res = await client.request(clientQuery, { id });
//         console.log(id, res)
//         return res.client;
//     }

//     const getClients = async () => {
//         const res = await client.request(clientsQuery);
//         return res.clients;
//     }

//     const uploadClients = async (fileList: FileList) => {
//         const url = 'http://localhost:5000/api/uploadClients';

//         const config = {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         }

//         const { data } = await axios.post(url, getFormData(fileList), config);
//         return data;
//     }

//     const deleteClients = async (ids: string[]) => {
//         const { deleteManyClients } = await client.request(deleteManyClientsMutation, { ids });
//         return deleteManyClients;
//     }

//     function getFormData(fileList: FileList): FormData {
//         const formData = new FormData();

//         for (let index in fileList) {
//             formData.append('csv-file', fileList[index]);
//         }

//         return formData;
//     }

//     return {
//         getClient,
//         getClients,
//         uploadClients,
//         deleteClients
//     }
// };

// export default useClientApi;