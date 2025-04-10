import axios from "axios";

async function checkServerReady(clsType, serverAddress, resolver) {
    try {
        const res = await axios.get(`${serverAddress}/server_ready`, {params: { cls_type: clsType }});
        if(!res?.status == 204) {
            await sleep(3);
            checkServerReady(clsType, serverAddress, resolver);
        } else {
            resolver(true);
        }
    } catch (e) {
        if(e.response?.status === 503) {
            await sleep(3);
            checkServerReady(clsType, serverAddress, resolver);
        } else {
            console.error(e);
        }

    }
}

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}

export default checkServerReady;