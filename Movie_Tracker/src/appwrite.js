import { Client, Databases, Query, ID } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID; 

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject(PROJECT_ID); // Your project ID

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    // 1. Use appwrite SDK to check if a document with the search term already exists in the database. 
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID,[
            Query.equal('searchTerm', searchTerm) // Query to find the document with the specified search term
        ]); // list all documents in the specified collection

        // 2. if it exists, update the count field by incrementing it by 1
        if(result.documents.length > 0) {
            const doc = result.documents[0]; // get the first document that matches the query

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
        })
        // 3. if it doesn't exist, create a new document with the search term and count set to 1
    }     else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
    }
    } catch (error) {
        console.error(error);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5), // Limit the results to the top 5 trending movies
            Query.orderDesc('count') // Order the results by count in descending order
        ])

        return result.documents; // Return the list of trending movies
    } catch (error) {
        console.error(error);
    }
}