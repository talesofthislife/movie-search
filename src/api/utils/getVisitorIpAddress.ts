//https://www.ipify.org/
export async function getVisitorIpAddress() {
    try {
        const req = await fetch('https://api.ipify.org?format=json');

        const data = await req.json() as {ip: string;}

        return data;
    } catch(e){
        console.log(e);
    }
}