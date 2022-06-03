import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';


const client =  sanityClient({
    projectId: 'phonax-dev',
    dataset: 'production',
    apiVersion: 'v1',
    useCdn: true,
    token: ''
})