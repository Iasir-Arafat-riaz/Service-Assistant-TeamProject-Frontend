
import { io } from 'socket.io-client';
const socket = io("https://fierce-meadow-12011.herokuapp.com/");
const useSocket = () => {
    // common function 
    const jsParse = data => {
        console.log('parse', data);
        return JSON.parse(data);
    }
    const jsStringify = data => {
        return JSON.stringify(data)
    }

    // user user in local storage
    const saveUser = user => {
        console.log(user, 'dkfjdkfjdkljk');
        if (user.id) {
            const allClient = getAllClientLocal();
            console.log(allClient, 'saveUser');
            if (allClient) {
                const checkingUser = allClient.find(data => data.id === user.id);
                console.log(checkingUser);
                if (!checkingUser?.id) {
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
        console.log('all', allClient);
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