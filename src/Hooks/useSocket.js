
import { io } from 'socket.io-client';
const socket = io("https://service-assistant.adaptable.app/");
const useSocket = () => {
    // common function 
    const jsParse = data => {
        return JSON.parse(data);
    }
    const jsStringify = data => {
        return JSON.stringify(data)
    }

    // user user in local storage
    const saveUser = user => {
        if (user.uid) {
            const allClient = getAllClientLocal();
            if (allClient) {
                const checkingUser = allClient.find(data => data.uid === user.uid);
                if (!checkingUser?.uid) {
                    localStorage.setItem('clients', jsStringify([...allClient, user]));
                    return [...allClient, user];
                }
                return allClient;
            }
            else {
                localStorage.setItem('clients', jsStringify([user]))
                return [user];
            }
        }
    }
    const getAllClientLocal = () => {
        const allClient = localStorage.getItem("clients");
        if (allClient) {
            return jsParse(allClient);
        }
        return null;
    }

    return {
        socket,
        saveUser,
        getAllClientLocal,
    };
};

export default useSocket;