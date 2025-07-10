export const FetchAccAWS = async() => {
    const url = process.env.NEXT_PUBLIC_API_URL_TEST;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "cpv": "B63C40D248"
            })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error in JumioAccountCreation:', err);
        throw err;
    }
}