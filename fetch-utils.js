const SUPABASE_URL = 'https://wegojudrlwgimzqmwooj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTMyMzk4MywiZXhwIjoxOTU2ODk5OTgzfQ.ppPqz9JNeolxcyL-9q4sapm5i3lv7v2yH_FQIOKHJOc';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createItem(item, quantity) {
    const response = await client 
        .from('shopping')
        .insert ([{ item, quantity, bought: false }])
        .single();

    return checkError(response);
}

export async function getItem() {
    const response = await client 
        .from('shopping')
        .select()
        .order('bought');

    return checkError(response);
}

export async function buyItem(id) {
    const response = await client 
        .from('shopping')
        .update({ bought: true })
        .match({ id: id });

    return checkError(response);
}


export async function deleteAllItems() {
    const response = await client
        .from('shopping')
        .delete();

    return checkError(response);
}
export async function deleteIndividualItems(item) {
    const response = await client
        .from('shopping')
        .delete({ item })
        .match({ item: item });

    return checkError(response);
}



export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./shopping-list');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
